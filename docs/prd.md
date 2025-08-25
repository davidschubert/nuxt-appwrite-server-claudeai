# Product Requirements Document (PRD)

## Ziel / Vision
Ein minimal CMS mit moderner, skalierbarer Architektur: SSR + Auth via HttpOnly-Cookies, Nuxt 4 + Appwrite Backend, sichere und minimal UI/UX.

## Nutzer-Stories
- Als Nutzer:in will ich mich registrieren und einloggen können.
- Als Entwickler: Pinia-State soll SSR-initialisiert geladen werden ohne Mismatch.
- Als Admin: Kommentare sollen RBAC-geschützt via Appwrite verwaltet werden (lesen, erstellen, löschen).

## Funktionale Anforderungen
- Login/Register über serverseitige Appwrite-Endpunkte
- HttpOnly-Cookie Setzen/Löschen auf Server-Seite
- Authentifizierter Zugriff auf bestimmte Seiten im CMS

## Nicht-funktionale Anforderungen
- SSR-freundlich, Performance-optimiert
- Security-by-Design: Zod, RBAC, XSS/CSRF-Schutz
- Production-Ready nach ESLint/Prettier Richtlinien

## Abhängigkeiten
- Nuxt 4, Pinia 3, Appwrite SDKs, Tailwind v4, Nuxt UI v3

## Akzeptanzkriterien
- Pinia hydratisiert direkt ohne First-Empty-Paint
- Endpunkte dokumentiert + validated (Zod + Doku-Referenz)

## Dokumentationsquellen
- Nuxt 4: https://nuxt.com/docs/4.x
- Appwrite: https://appwrite.io/docs (Nutze sehr gerne den aktiven Appwrite MCP Server um mit der Datenbank zu kommunizieren)
- Pinia (SSR Nuxt): https://pinia.vuejs.org/ssr/nuxt.html
- Tailwind v4: https://tailwindcss.com/docs/upgrade-guide#changes-from-v3


---

---
---

## **/docs/prd.md**
Ein Product Requirements Document, das als Grundlage für das zu bauende Projekt dient.

```markdown
# Product Requirements Document (PRD): "CommuneSphere"

## 1. Vision & Ziel

**CommuneSphere** ist eine moderne Plattform für themenspezifische Diskussionen. Das Projekt dient als **Blaupause** für den Bau sicherer, SSR-basierter Webanwendungen mit Nuxt 4 und Appwrite und demonstriert Best Practices für Authentifizierung und serverseitiges Rendering.

## 2. Kernfeatures (MVP)

### 2.1. Benutzerauthentifizierung
- **Registrierung & Login:** Nutzer können ein Konto erstellen und sich anmelden. Eine `HttpOnly`-Cookie-Session wird serverseitig erstellt.
- **Logout:** Zerstört die serverseitige Session und den Cookie.
- **Session-Management:** Der Nutzerstatus wird per SSR an den Client übermittelt und bleibt über Reloads hinweg erhalten.

### 2.2. Threads & Kommentare
- **Thread-Erstellung:** Authentifizierte Nutzer können einen neuen Thread mit Titel und Text erstellen.
- **Thread-Ansicht:** Alle Nutzer können eine Liste aller Threads sehen.
- **Kommentar-Erstellung:** Authentifizierte Nutzer können auf Threads und andere Kommentare antworten.
- **Kommentar-Anzeige:** Kommentare werden hierarchisch dargestellt.

## 3. Technische Anforderungen

- **Frontend:** Nuxt 4 (SSR aktiv), Pinia 3, Nuxt UI v3 / Tailwind CSS v4.
- **Backend:** Appwrite (Cloud oder Self-Hosted).
    - **Datenbank:** Collections für `Users`, `Threads`, `Comments`.
    - **Sicherheit:** Strikte RBAC-Berechtigungen auf Dokumentenebene.
- **Architektur:** Die gesamte Auth-Logik wird in Nitro Server-Routen (`/server/api`) abgewickelt. Der Client hat niemals Zugriff auf API-Keys oder Tokens.

## 4. Außerhalb des Scopes (MVP)
- Benutzerprofile & Avatare
- Up-/Down-Voting
- Bearbeiten oder Löschen von Inhalten
- Echtzeit-Updates