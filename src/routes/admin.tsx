import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useCallback, useEffect, type DragEvent } from "react";

/* ─── Constants ─── */
const STORAGE_KEY = "yiora-gallery";
const AUTH_KEY = "yiora-admin-auth";
const VALID_USER = "Sammy";
const VALID_PASS = "Sammy@1234";
const MAX_DIMENSION = 1200;
const JPEG_QUALITY = 0.82;

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

/* ─── Helpers ─── */

function readGallery(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeGallery(images: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
}

function isAuthenticated(): boolean {
  return localStorage.getItem(AUTH_KEY) === "true";
}

function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width, height } = img;
        if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
          const scale = MAX_DIMENSION / Math.max(width, height);
          width = Math.round(width * scale);
          height = Math.round(height * scale);
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", JPEG_QUALITY));
      };
      img.onerror = reject;
      img.src = reader.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/* ─── Login Form ─── */

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === VALID_USER && password === VALID_PASS) {
      localStorage.setItem(AUTH_KEY, "true");
      onLogin();
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-[1.5rem] bg-card p-8 shadow-soft">
        <h1 className="font-display text-2xl font-bold text-cocoa text-center">Admin Login</h1>
        <p className="mt-2 text-sm text-foreground/60 text-center">Gallery management access</p>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div>
            <label htmlFor="admin-user" className="block text-sm font-medium text-cocoa mb-1">
              Username
            </label>
            <input
              id="admin-user"
              type="text"
              required
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
              className="w-full rounded-xl border border-cocoa/20 bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-rose focus:ring-2 focus:ring-rose/30 outline-none transition"
              autoComplete="username"
            />
          </div>
          <div>
            <label htmlFor="admin-pass" className="block text-sm font-medium text-cocoa mb-1">
              Password
            </label>
            <input
              id="admin-pass"
              type="password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="w-full rounded-xl border border-cocoa/20 bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-rose focus:ring-2 focus:ring-rose/30 outline-none transition"
              autoComplete="current-password"
            />
          </div>
          {error && <p className="text-sm text-destructive text-center">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-full bg-cocoa py-3 font-medium text-background shadow-lift transition-colors hover:bg-berry touch-target"
          >
            Sign in
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-foreground/50 hover:text-rose transition-colors">
            &larr; Back to site
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── Photo Manager ─── */

function PhotoManager({ onLogout }: { onLogout: () => void }) {
  const [images, setImages] = useState<string[]>(() => readGallery());
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    writeGallery(images);
  }, [images]);

  const handleUpload = useCallback(async (files: FileList | null) => {
    if (!files) return;
    const compressed = await Promise.all(Array.from(files).map((f) => compressImage(f)));
    setImages((prev) => [...prev, ...compressed]);
  }, []);

  const handleDelete = useCallback((idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  }, []);

  const moveUp = useCallback((idx: number) => {
    if (idx === 0) return;
    setImages((prev) => {
      const next = [...prev];
      [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
      return next;
    });
  }, []);

  const moveDown = useCallback((idx: number) => {
    setImages((prev) => {
      if (idx >= prev.length - 1) return prev;
      const next = [...prev];
      [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
      return next;
    });
  }, []);

  /* Drag-and-drop reorder */
  const onDragStart = (idx: number) => setDragIdx(idx);
  const onDragOver = (e: DragEvent, idx: number) => {
    e.preventDefault();
    if (dragIdx === null || dragIdx === idx) return;
    setImages((prev) => {
      const next = [...prev];
      const [moved] = next.splice(dragIdx, 1);
      next.splice(idx, 0, moved);
      return next;
    });
    setDragIdx(idx);
  };
  const onDragEnd = () => setDragIdx(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-cocoa/10 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 sm:px-6">
          <div>
            <h1 className="font-display text-xl font-bold text-cocoa">Gallery Manager</h1>
            <p className="text-xs text-foreground/50">
              {images.length} photo{images.length !== 1 ? "s" : ""} stored locally
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="rounded-full border border-cocoa/20 px-4 py-2 text-sm text-cocoa hover:bg-cocoa/5 transition touch-target-sm"
            >
              View site
            </Link>
            <button
              onClick={onLogout}
              className="rounded-full border border-destructive/30 px-4 py-2 text-sm text-destructive hover:bg-destructive/5 transition touch-target-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        {/* Upload area */}
        <div
          className="rounded-[1.5rem] border-2 border-dashed border-cocoa/20 bg-card p-8 text-center transition-colors hover:border-rose/40 hover:bg-rose/5 cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          aria-label="Upload photos"
        >
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose/10">
            <svg
              className="h-6 w-6 text-rose"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <p className="font-display text-lg font-semibold text-cocoa">Upload new photos</p>
          <p className="mt-1 text-sm text-foreground/50">
            Click or drag &amp; drop images here. They&apos;ll be compressed and stored locally.
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleUpload(e.target.files)}
          />
        </div>

        {/* Photo grid */}
        {images.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((src, idx) => (
              <figure
                key={`${src.slice(-20)}-${idx}`}
                draggable
                onDragStart={() => onDragStart(idx)}
                onDragOver={(e) => onDragOver(e, idx)}
                onDragEnd={onDragEnd}
                className={`group relative overflow-hidden rounded-[1.25rem] shadow-soft transition-shadow hover:shadow-lift ${
                  dragIdx === idx ? "opacity-50 scale-95" : ""
                }`}
              >
                <img
                  src={src}
                  alt={`Gallery photo ${idx + 1}`}
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
                {/* Controls overlay */}
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-cocoa/85 to-transparent p-3 sm:p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs text-background/80 font-medium">#{idx + 1}</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => moveUp(idx)}
                      disabled={idx === 0}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-background/20 text-background hover:bg-background/30 transition disabled:opacity-30 disabled:cursor-not-allowed"
                      aria-label="Move up"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => moveDown(idx)}
                      disabled={idx === images.length - 1}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-background/20 text-background hover:bg-background/30 transition disabled:opacity-30 disabled:cursor-not-allowed"
                      aria-label="Move down"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(idx)}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive/30 text-background hover:bg-destructive/50 transition"
                      aria-label="Delete photo"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </figure>
            ))}
          </div>
        ) : (
          <div className="mt-12 text-center">
            <p className="text-foreground/40 text-sm">
              No photos uploaded yet. Add your first gallery image above.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

/* ─── Page Component ─── */

function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(() => isAuthenticated());

  const handleLogout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    setLoggedIn(false);
  }, []);

  if (!loggedIn) {
    return <LoginForm onLogin={() => setLoggedIn(true)} />;
  }

  return <PhotoManager onLogout={handleLogout} />;
}
