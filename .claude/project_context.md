# Projektkontext: CommuneSphere

## 1. Aktuelle Dateistruktur (vereinfacht)
### Hier die Standardstruktur eines Nuxt 4-Projekts (Root-Ebene und wichtige Unterordner):

- `.output/`: Build-Ausgabe im Produktionsmodus
- `app/`: Hauptcode: Vue-Komponenten, Seiten, Layouts etc.
- `content/`: (optional) für Nuxt Content — CMS-Dateien
- `modules/`: lokale Module
- `node_modules/`: Abhängigkeiten (ignored im Git)
- `public/`: statische Assets (favicon, robots.txt, ...)
- `server/`: Serverseitige Logik: APIs, Middleware, Routes, Nitro-Plugins, Utils
- `shared/`: (seit Nuxt≥3.14) gemeinsame Nutzung von Code zwischen App und Server
- `.env`: Umgebungsvariablen
- `.gitignore`: Git-Ausschlüsse
- `.nuxtignore`: Ausschluss für Nuxt-Build
- `.nuxtrc`: Nuxt-Konfiguration, flach
- `nuxt.config.ts`: zentrale Konfiguration
- `package.json`: Dependencies & Scripts
- `tsconfig.json`: TypeScript-Konfiguration

### Details zu den wichtigsten Ordnern:
- `app/`: Beinhaltet alle Frontend-relevanten Komponenten wie `app/assets/`, `app/components/`, `app/composables/`, `app/layouts/`, `app/middleware/`, `app/pages/`, `app/plugins/`, `app/utils/`, `app/stores/`, sowie `app/app.vue` und mögliche Konfigurationsdateien. Diese Umstellung ist eine der markantesten Neuerungen in Nuxt 4; sie dient Performance‑ und IDE‑Unterstützung  ￼ ￼.
- `server/`: Für Backend-Logik mit `server/api/`, `server/routes/`, `server/middleware/`, `server/plugins/` und `server/utils/`. Hier werden deine serverseitigen Endpunkte und Middleware definiert – automatisches HMR inklusive  ￼.
- `shared/`: Neu in Nuxt 4: gemeinsame Logik, die sowohl im Frontend als auch im Backend verfügbar ist (zum Beispiel Utility-Funktionen oder Typen).
- `public/`: Statische Dateien für direkte Auslieferung.
- `.output/`: Build-Resultate—nicht versionieren  ￼.
- Konfigurationsdateien wie `.env`, `.nuxtignore`, `.nuxtrc`, `nuxt.config.ts`, `tsconfig.json`, `app.config.ts` steuern Verhalten und Umgebung des Projekts.

## 2. Kernabhängigkeiten

- `nuxt`: v4.x
- `pinia`: v3.x
- `@nuxtjs/tailwindcss`: (für v4-Support)
- `@nuxt/ui`: v3.x
- `appwrite`: (Client SDK)
- `node-appwrite`: (Server SDK)
- `zod`: v3.x

## 3. Wichtige Architekturentscheidungen

- **Auth-Flow:** Der Login/Register-Prozess findet ausschließlich in `server/api/` statt. Bei Erfolg wird ein `HttpOnly`, `Secure`, `SameSite=Strict` Cookie gesetzt, der die Appwrite-Session enthält.

- **Session-Initialisierung:** Bei jedem App-Start (SSR) ruft das Plugin `plugins/01-init-user.ts` den internen Endpunkt `server/api/appwrite/user.get.ts` auf. Dieser validiert den Cookie serverseitig mit dem Appwrite Node SDK und gibt die User-Daten zurück.

- **State-Hydration:** Der Pinia `app/stores/user.ts` Store wird auf dem Server mit den Daten aus dem `user.get.ts`-Aufruf befüllt. Dieser Zustand wird dann sicher an den Client übertragen (hydriert). Dadurch gibt es keinen "Flash of unauthenticated content".

- **Seitenschutz:** Die Route-Middleware `middleware/auth.ts` prüft vor dem Rendern einer geschützten Seite (z.B. `/dashboard`), ob der Pinia-Store einen authentifizierten Nutzer enthält. Falls nicht, erfolgt eine Weiterleitung zur `/login`-Seite.

- **UI-Bibliothek:** Nuxt UI wird für alle Basis-Komponenten verwendet.