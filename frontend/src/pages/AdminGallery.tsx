import { useState, useEffect } from "react";
import { Trash2, ArrowUp, ArrowDown, Upload, Loader2, CheckCircle2, RotateCcw, Archive } from "lucide-react";

export function AdminGallery() {
    const [media, setMedia] = useState<string[]>([]);
    const [trashMedia, setTrashMedia] = useState<string[]>([]);
    const [showTrash, setShowTrash] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");
    const [cacheKey, setCacheKey] = useState(Date.now()); // Verhindert das Cache-Problem
    const token = localStorage.getItem("token");

    const fetchGallery = async () => {
        try {
            const res = await fetch("https://messerschmiede-schwaiger.at/api/gallery");
            const data = await res.json();
            setMedia(data);
        } catch (err) {
            console.error("Fehler beim Laden:", err);
        }
    };

    const fetchTrash = async () => {
        try {
            const res = await fetch("https://messerschmiede-schwaiger.at/api/gallery/trash", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const data = await res.json();
            setTrashMedia(data);
        } catch (err) {
            console.error("Fehler beim Laden des Papierkorbs:", err);
        }
    };

    useEffect(() => {
        fetchGallery();
        fetchTrash();
    }, []);

    // VERBESSERT: Einzel-Upload gegen Timeouts und Verschwinden der Bilder
    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        
        const files = Array.from(e.target.files);
        setUploading(true);
        let successCount = 0;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            setMessage(`Lade hoch: ${file.name} (${i + 1}/${files.length})`);

            const formData = new FormData();
            formData.append("galleryFiles", file);

            try {
                const res = await fetch("https://messerschmiede-schwaiger.at/api/gallery/upload", {
                    method: "POST",
                    headers: { "Authorization": `Bearer ${token}` },
                    body: formData
                });
                
                if (res.ok) {
                    successCount++;
                    // Optional: Nach jedem Bild laden (kann zum Flackern führen)
                    // await fetchGallery(); 
                }
            } catch (err) {
                console.error(`Fehler bei ${file.name}:`, err);
            }
        }

        // Am Ende einmal alles sauber neu laden
        setCacheKey(Date.now());
        await fetchGallery();
        setUploading(false);
        setMessage(successCount > 0 ? `${successCount} Datei(en) erfolgreich hochgeladen!` : "Upload fehlgeschlagen.");
        setTimeout(() => setMessage(""), 3000);
    };

    const moveItem = async (oldIndex: number, direction: 'up' | 'down') => {
        const newIndex = direction === 'up' ? oldIndex - 1 : oldIndex + 1;
        if (newIndex < 0 || newIndex >= media.length) return;

        try {
            const res = await fetch("https://messerschmiede-schwaiger.at/api/gallery/reorder", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ oldIndex, newIndex })
            });

            if (res.ok) {
                // WICHTIG: CacheKey ändern, damit die Bilder an den neuen Positionen neu geladen werden
                setCacheKey(Date.now());
                await fetchGallery();
            }
        } catch (err) {
            console.error("Netzwerk-Fehler:", err);
        }
    };

    const deleteItem = async (filename: string) => {
        if (!confirm("In den Papierkorb verschieben?")) return;
        try {
            const res = await fetch(`https://messerschmiede-schwaiger.at/api/gallery/${filename}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (res.ok) {
                setCacheKey(Date.now());
                await fetchGallery();
                await fetchTrash();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const restoreItem = async (filename: string) => {
        try {
            const res = await fetch(`https://messerschmiede-schwaiger.at/api/gallery/restore/${filename}`, {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (res.ok) {
                setMessage("Wiederhergestellt!");
                setCacheKey(Date.now());
                await fetchGallery();
                await fetchTrash();
                setTimeout(() => setMessage(""), 3000);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="p-6 bg-neutral-900 border border-amber-900/20 rounded-lg max-w-4xl mx-auto my-10">
            <div className="flex justify-between items-center mb-8 border-b border-amber-900/20 pb-4">
                <div>
                    <h2 className="text-2xl font-serif text-amber-500 uppercase tracking-widest">Galerie Verwaltung</h2>
                    <p className="text-neutral-500 text-xs mt-1">
                        {showTrash ? "Papierkorb" : "Live-Ansicht"}
                    </p>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => { setShowTrash(!showTrash); fetchTrash(); }}
                        className={`flex items-center gap-2 px-4 py-2 rounded transition-all font-bold uppercase text-sm border ${showTrash
                                ? "bg-amber-600 border-amber-600 text-black"
                                : "border-amber-900/40 text-amber-500 hover:border-amber-500"
                            }`}
                    >
                        <Archive size={18} />
                        {showTrash ? "Zur Galerie" : "Papierkorb"}
                    </button>

                    {!showTrash && (
                        <label className="flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-black px-4 py-2 rounded cursor-pointer transition-colors font-bold uppercase text-sm">
                            {uploading ? <Loader2 className="animate-spin" size={18} /> : <Upload size={18} />}
                            {uploading ? "Lade..." : "Hochladen"}
                            <input type="file" multiple className="hidden" onChange={handleUpload} accept="image/*,video/*" disabled={uploading} />
                        </label>
                    )}
                </div>
            </div>

            {message && (
                <div className="mb-4 p-3 bg-green-900/20 border border-green-500 text-green-500 flex items-center gap-2">
                    <CheckCircle2 size={18} /> {message}
                </div>
            )}

            <div className="space-y-3">
                {(showTrash ? trashMedia : media).map((item, index) => (
                    <div key={`${item}-${cacheKey}`} className={`flex items-center justify-between bg-neutral-950 p-3 border transition-all group ${showTrash ? 'border-red-900/20' : 'border-amber-900/10 hover:border-amber-600/30'}`}>
                        <div className="flex items-center gap-4">
                            <span className="text-neutral-600 font-mono w-6">{index + 1}.</span>
                            <div className="w-16 h-16 bg-neutral-800 flex items-center justify-center overflow-hidden border border-neutral-700">
                                {item.toLowerCase().endsWith('.mp4') || item.toLowerCase().endsWith('.mov') ? (
                                    <video src={`https://messerschmiede-schwaiger.at/api/images/gallery/${showTrash ? 'trash/' : ''}${item}?t=${cacheKey}`} className="w-full h-full object-cover" />
                                ) : (
                                    <img src={`https://messerschmiede-schwaiger.at/api/images/gallery/${showTrash ? 'trash/' : ''}${item}?t=${cacheKey}`} className="w-full h-full object-cover" />
                                )}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-neutral-300 text-sm truncate max-w-[150px]">{showTrash ? item.split('-').slice(1).join('-') : item}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            {showTrash ? (
                                <button
                                    onClick={() => restoreItem(item)}
                                    className="flex items-center gap-2 px-3 py-1 text-green-500 hover:bg-green-600 hover:text-white border border-green-900/30 transition-all text-xs uppercase font-bold"
                                >
                                    <RotateCcw size={14} /> Wiederherstellen
                                </button>
                            ) : (
                                <>
                                    <button onClick={() => moveItem(index, 'up')} disabled={index === 0} className="p-2 text-amber-500 hover:bg-amber-600 hover:text-black disabled:opacity-20 transition-all">
                                        <ArrowUp size={18} />
                                    </button>
                                    <button onClick={() => moveItem(index, 'down')} disabled={index === media.length - 1} className="p-2 text-amber-500 hover:bg-amber-600 hover:text-black disabled:opacity-20 transition-all">
                                        <ArrowDown size={18} />
                                    </button>
                                    <button onClick={() => deleteItem(item)} className="ml-4 p-2 text-red-500 hover:bg-red-600 hover:text-white transition-all">
                                        <Trash2 size={18} />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}