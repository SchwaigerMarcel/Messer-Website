import React, { useState, useEffect } from 'react';

interface Spec { label: string; value: string; }
interface Product {
    id: number; name: string; category: string; price: string;
    description: string; long_description: string; image: string;
    features: string[]; specifications: Spec[]; mainImage?: string;
}

export const AdminDashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    // Form States
    const [editId, setEditId] = useState<number | null>(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [folderName, setFolderName] = useState('');
    const [category, setCategory] = useState('Küchenmesser');
    const [desc, setDesc] = useState('');
    const [longDesc, setLongDesc] = useState('');
    const [features, setFeatures] = useState('');
    const [specs, setSpecs] = useState<Spec[]>([{ label: '', value: '' }]);
    
    const [mainFile, setMainFile] = useState<File | null>(null);
    const [galleryFiles, setGalleryFiles] = useState<FileList | null>(null);
    const [existingImages, setExistingImages] = useState<string[]>([]);

    const [products, setProducts] = useState<Product[]>([]);
    const [trash, setTrash] = useState<Product[]>([]);
    const [showTrash, setShowTrash] = useState(false);

    const API_BASE = 'https://messerschmiede-schwaiger.at/api';

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) { setIsAuthenticated(true); fetchProducts(); }
    }, []);

    useEffect(() => { if (editId) fetchImages(); }, [editId]);

    const fetchProducts = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${API_BASE}/products`);
            setProducts(await res.json());
            const tRes = await fetch(`${API_BASE}/trash`, { headers: { 'Authorization': `Bearer ${token}` } });
            setTrash(await tRes.json());
        } catch (e) { console.error(e); }
    };

    const fetchImages = async () => {
        const res = await fetch(`${API_BASE}/products/${editId}/images`);
        setExistingImages(await res.json());
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (data.token) {
            localStorage.setItem('token', data.token);
            setIsAuthenticated(true);
            fetchProducts();
        } else { alert("Login fehlgeschlagen"); }
    };

    const handleEdit = (p: Product) => {
        setEditId(p.id); setName(p.name); setPrice(p.price); setFolderName(p.image);
        setCategory(p.category); setDesc(p.description); setLongDesc(p.long_description);
        setFeatures(Array.isArray(p.features) ? p.features.join(', ') : '');
        setSpecs(p.specifications || [{ label: '', value: '' }]);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDirectUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !editId) return;
        const formData = new FormData();
        Array.from(e.target.files).forEach(f => formData.append('gallery', f));
        await fetch(`${API_BASE}/products/${editId}/upload`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            body: formData
        });
        fetchImages();
    };

    const setAsMain = async (filename: string) => {
        await fetch(`${API_BASE}/products/${editId}/main-image`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            body: JSON.stringify({ filename })
        });
        fetchImages(); // Bilder neu laden, da Pfade sich ändern
        fetchProducts();
        alert("Hauptbild gesetzt!");
    };

    const deleteImg = async (f: string) => {
        if (!confirm("Bild löschen?")) return;
        await fetch(`${API_BASE}/products/${editId}/images/${f}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        fetchImages();
    };

    const updateSpec = (i: number, f: 'label' | 'value', v: string) => {
        const n = [...specs]; n[i][f] = v; setSpecs(n);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('name', name);
        formData.append('category', category);
        formData.append('price', price);
        formData.append('description', desc);
        formData.append('long_description', longDesc);
        formData.append('image', folderName);
        formData.append('features', JSON.stringify(features.split(',').map(f => f.trim())));
        formData.append('specifications', JSON.stringify(specs));
        
        if (mainFile) formData.append('mainImage', mainFile);
        if (galleryFiles) Array.from(galleryFiles).forEach(f => formData.append('gallery', f));

        const url = editId ? `${API_BASE}/products/${editId}` : `${API_BASE}/products`;
        await fetch(url, {
            method: editId ? 'PUT' : 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData
        });
        setEditId(null); fetchProducts(); alert("Gespeichert!");
    };

    if (!isAuthenticated) return (
        <div className="min-h-screen flex items-center justify-center bg-black p-4">
            <form onSubmit={handleLogin} className="bg-neutral-900 p-8 rounded-lg border border-neutral-800 w-full max-w-md">
                <h2 className="text-amber-500 text-2xl font-bold mb-6 uppercase text-center">Admin Login</h2>
                <input className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded mb-4 text-white" type="text" placeholder="User" onChange={e => setUsername(e.target.value)} />
                <input className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded mb-6 text-white" type="password" placeholder="Pass" onChange={e => setPassword(e.target.value)} />
                <button className="w-full bg-amber-600 p-3 rounded font-bold uppercase hover:bg-amber-500 transition-all">Anmelden</button>
            </form>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto mt-10 p-4 text-white">
            <div className="flex justify-between items-center mb-8 bg-neutral-900 p-4 rounded border border-neutral-800">
                <h1 className="text-xl font-bold text-amber-500 uppercase">Dashboard</h1>
                <button onClick={() => { localStorage.removeItem('token'); window.location.reload(); }} className="text-xs bg-neutral-800 text-neutral-400 border border-neutral-700 px-4 py-2 rounded hover:bg-red-600 hover:text-white transition-all uppercase font-bold">Abmelden</button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <form onSubmit={handleSubmit} className="p-6 bg-neutral-900 space-y-4 rounded-lg shadow-xl border border-neutral-800 h-fit">
                    <h2 className="text-2xl font-bold text-amber-500 mb-4 uppercase">{editId ? `Edit: ${name}` : "Neues Messer"}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input value={name} placeholder="Name" className="p-2 bg-neutral-800 border border-neutral-700 rounded" onChange={e => setName(e.target.value)} required />
                        <input value={price} placeholder="Preis" type="number" className="p-2 bg-neutral-800 border border-neutral-700 rounded" onChange={e => setPrice(e.target.value)} required />
                        <input value={folderName} placeholder="Ordnername" className="p-2 bg-neutral-800 border border-neutral-700 rounded" onChange={e => setFolderName(e.target.value)} required />
                        <select className="p-2 bg-neutral-800 border border-neutral-700 rounded" value={category} onChange={e => setCategory(e.target.value)}>
                            <option value="Küchenmesser">Küchenmesser</option>
                            <option value="Jagdmesser">Jagdmesser</option>
                            <option value="Outdoor">Outdoor</option>
                            <option value="Klappmesser">Klappmesser</option>
                        </select>
                    </div>
                    <textarea value={desc} placeholder="Kurztext" className="w-full p-2 bg-neutral-800 border border-neutral-700 rounded h-20" onChange={e => setDesc(e.target.value)} />
                    <textarea value={longDesc} placeholder="Langtext" className="w-full p-2 bg-neutral-800 border border-neutral-700 rounded h-32" onChange={e => setLongDesc(e.target.value)} />
                    <input value={features} placeholder="Features (Komma-getrennt)" className="w-full p-2 bg-neutral-800 border border-neutral-700 rounded" onChange={e => setFeatures(e.target.value)} />
                    
                    <div className="bg-neutral-800 p-4 rounded border border-neutral-700">
                        <label className="block mb-2 font-semibold text-amber-400 text-sm">Specs:</label>
                        {specs.map((s, i) => (
                            <div key={i} className="flex gap-2 mb-2">
                                <input placeholder="Label" className="w-1/2 p-1 bg-neutral-700 rounded text-sm" value={s.label} onChange={e => updateSpec(i, 'label', e.target.value)} />
                                <input placeholder="Wert" className="w-1/2 p-1 bg-neutral-700 rounded text-sm" value={s.value} onChange={e => updateSpec(i, 'value', e.target.value)} />
                            </div>
                        ))}
                        <button type="button" onClick={() => setSpecs([...specs, {label:'', value:''}])} className="text-xs bg-neutral-600 px-3 py-1 rounded">+ Zeile</button>
                    </div>

                    {editId && (
                        <div className="bg-neutral-800 p-4 rounded border border-neutral-700">
                            <label className="block mb-2 font-semibold text-amber-400 text-sm uppercase">Galerie Verwaltung:</label>
                            <div className="grid grid-cols-3 gap-2 mb-4">
                                {existingImages.map(img => (
                                    <div key={img} className="relative group border border-neutral-600 rounded overflow-hidden aspect-square bg-neutral-900">
                                        {/* Cache-Buster im Admin-Bereich aktiv */}
                                        <img src={`${API_BASE}/images/${folderName}/${img}?t=${Date.now()}`} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1 transition-all">
                                            {/* Button nur anzeigen, wenn es nicht bereits im main-Ordner liegt */}
                                            {!img.startsWith('main/') && (
                                                <button type="button" onClick={() => setAsMain(img)} className="text-[10px] bg-amber-600 px-2 py-1 rounded font-bold uppercase">Main</button>
                                            )}
                                            <button type="button" onClick={() => deleteImg(img)} className="text-[10px] bg-red-600 px-2 py-1 rounded font-bold uppercase">Lösch</button>
                                        </div>
                                        {img.startsWith('main/') && (
                                            <div className="absolute top-0 left-0 bg-amber-500 text-black text-[8px] font-bold px-1 uppercase">Main</div>
                                        )}
                                    </div>
                                ))}
                                <label className="border-2 border-dashed border-neutral-600 rounded flex items-center justify-center cursor-pointer hover:border-amber-500">
                                    <span className="text-xl">+</span>
                                    <input type="file" multiple className="hidden" onChange={handleDirectUpload} />
                                </label>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-4">
                        <div className="border-2 border-dashed border-amber-600/30 p-4 rounded bg-amber-600/5">
                            <label className="block text-xs font-bold text-amber-500 uppercase mb-2">Neues Hauptbild (lädt in /main/)</label>
                            <input type="file" onChange={e => setMainFile(e.target.files ? e.target.files[0] : null)} className="text-sm w-full" />
                        </div>
                        <div className="border-2 border-dashed border-neutral-700 p-4 rounded bg-neutral-800/50">
                            <label className="block text-xs font-bold text-neutral-400 uppercase mb-2">Mehr Galeriebilder</label>
                            <input type="file" multiple onChange={e => setGalleryFiles(e.target.files)} className="text-sm w-full" />
                        </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                        <button type="submit" className="bg-amber-600 hover:bg-amber-500 p-3 flex-1 font-bold uppercase rounded shadow-lg">Speichern</button>
                        {editId && <button type="button" onClick={() => {setEditId(null); setName('');}} className="bg-neutral-600 p-3 rounded uppercase font-bold">Abbrechen</button>}
                    </div>
                </form>

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-neutral-400 uppercase">{showTrash ? "Papierkorb" : "Bestand"}</h2>
                        <button onClick={() => setShowTrash(!showTrash)} className={`text-xs px-4 py-2 rounded font-bold uppercase border ${showTrash ? "bg-amber-600 text-white" : "bg-neutral-800 text-neutral-400"}`}>
                            {showTrash ? "Zum Bestand" : `Papierkorb (${trash.length})`}
                        </button>
                    </div>
                    <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden shadow-2xl">
                        {(showTrash ? trash : products).map(p => (
                            <div key={p.id} className="p-4 border-b border-neutral-800 flex justify-between items-center hover:bg-neutral-800/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-neutral-800 rounded border border-neutral-700 overflow-hidden">
                                        {p.mainImage && (
                                            <img 
                                                src={`${API_BASE}/images/${p.mainImage}?t=${Date.now()}`} 
                                                className="w-full h-full object-cover" 
                                            />
                                        )}
                                    </div>
                                    <div>
                                        <p className={`${showTrash ? "text-neutral-500" : "text-amber-500"} font-bold`}>{p.name}</p>
                                        <p className="text-xs text-neutral-500">{p.category} | {p.price}€</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    {showTrash ? (
                                        <>
                                            <button onClick={async () => { await fetch(`${API_BASE}/products/${p.id}/restore`, {method:'POST', headers:{'Authorization':`Bearer ${localStorage.getItem('token')}`}}); fetchProducts(); }} className="bg-green-600 text-white px-3 py-1 rounded text-xs">Restore</button>
                                            <button onClick={async () => { if(confirm("Endgültig löschen?")) { await fetch(`${API_BASE}/products/${p.id}/hard`, {method:'DELETE', headers:{'Authorization':`Bearer ${localStorage.getItem('token')}`}}); fetchProducts(); } }} className="bg-red-600 text-white px-3 py-1 rounded text-xs">Löschen</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => handleEdit(p)} className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded text-xs border border-blue-500/30">Edit</button>
                                            <button onClick={async () => { await fetch(`${API_BASE}/products/${p.id}`, {method:'DELETE', headers:{'Authorization':`Bearer ${localStorage.getItem('token')}`}}); fetchProducts(); }} className="bg-red-600/20 text-red-400 px-3 py-1 rounded text-xs border border-red-500/30">Trash</button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};