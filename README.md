# Carrot Game

Eine spielbare Static-Web-App für einen absurden Garten-Boxkampf mit custom Karotte, Lobby, Kampf-Arena, Punkten, Bilanz, Auszeichnungen und Synth-Gartenmusik.

## Lokal starten

```bash
python3 -m http.server 8100
```

Dann im Browser öffnen:

```text
http://127.0.0.1:8100/
```

## MVP-Status

- Seite-für-Seite Game-App mit Home, Locker, Lobby, Karriere und Arena
- Karotte benennen und mit Headwear, Blättern, Shorts-Mustern, Farben, Handschuhen und Gesicht pimpen
- Offene Gartenringe ansehen oder selbst einen Ring eröffnen
- Spielbarer Kampf mit Jab, Haymaker, Block, Ausweichen, Root Rush, HP, Energie, Fokus und Garten-Events
- Togglebare Hintergrundmusik mit generiertem Web-Audio-Groove, Bass, Melody, Kick/Snare/Hat und kleinen Soundeffekten
- Punkte, Siege, Niederlagen, Kampfanzahl, Serie und Auszeichnungen per `localStorage`
- Garten-Atmosphäre mit Ring, Wind, Blättern, Vögeln und Maus

Die Online-Lobby ist in dieser Version als lokale Bot-Simulation gebaut. Für echte Online-Spieler braucht die App als nächsten Schritt ein kleines WebSocket-Backend.
