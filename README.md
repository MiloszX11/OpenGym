# OpenGym
OpenGym is a browser-based workout planner with exercise demos, weekly challenges and a local soundtrack.

## GitHub Pages
Place index.html and the accompanying files in the repository root. Under Settings → Pages choose Deploy from a branch, select main and / (root), then save.

## Workout data
Each browser stores its workout history and profile in local storage. A new profile starts with zero XP and an empty history. Weight and height start at editable example values of 70 kg and 175 cm. Exported backups are personal files and should be kept outside the public repository.

## Muscle maps and movement demos
Open the info button on any exercise to see the movement, pause it, or inspect the front and rear maps. The demos are schematic keyframes. Reduced-motion mode starts them paused. The four new movements are adapted from the NHS strength exercise guide (https://www.nhs.uk/live-well/exercise/strength-exercises/).

The history map estimates active seconds from logged units and an assumed cadence. It distributes each exercise's time across its listed muscles using relative role weights of 1, 0.5 and 0.25, then scales shading to the leading muscle in the selected period. Weight lifted, individual technique and fatigue are outside this model. Calorie estimates use an assumed MET or a simplified work model for dumbbells.

## Audio
All four tracks ship locally. The next track plays automatically. The existing page still loads styling, icons, fonts and charts from external services.
