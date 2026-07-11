# Carrot Game

Eine spielbare Web-App für einen absurden Garten-Boxkampf mit custom Karotte, Online-Lobby, Kampf-Arena, Punkten, Bilanz, Auszeichnungen und Synth-Gartenmusik.

## Lokal starten

```bash
npm start
```

Dann im Browser öffnen:

```text
http://127.0.0.1:8100/
```

## MVP-Status

- Seite-für-Seite Game-App mit Home, Locker, Lobby, Karriere und Arena
- Karotte benennen und mit Headwear, Blättern, Shorts-Mustern, Farben, Handschuhen und Gesicht pimpen
- Echte Online-Räume über den Node-Server erstellen, joinen und gegeneinander kämpfen
- Bot-Gartenringe bleiben als Training verfügbar
- Spielbarer Kampf mit Jab, Haymaker, Block, Ausweichen, Root Rush, HP, Energie, Fokus und Garten-Events
- Togglebare Hintergrundmusik mit generiertem Web-Audio-Groove, Bass, Melody, Kick/Snare/Hat und kleinen Soundeffekten
- Punkte, Siege, Niederlagen, Kampfanzahl, Serie und Auszeichnungen per `localStorage`
- Garten-Atmosphäre mit Ring, Wind, Blättern, Vögeln und Maus
- Server-API: `/api/health`, `/api/online/rooms`, Join- und Action-Endpunkte
