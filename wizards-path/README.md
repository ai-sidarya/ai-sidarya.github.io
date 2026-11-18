# The Wizard's Path

A daily 60-minute chess path for any age. Every lesson trains a chess skill and a character muscle together (self-awareness, discipline, commitment, courage, resilience). Built for players past the basics.

## Run it

Open `index.html` in any modern browser. No build step, no dependencies, works offline.

To publish: push the folder to a GitHub repository, then turn on **Settings → Pages → Deploy from a branch** and choose the root of your main branch.

## Structure

```
index.html              landing page and lesson directory
assets/style.css        shared design
assets/app.js           boards from FEN, personality tabs, autosave, progress
lessons/lesson-01.html  Know Your Board Self (personality assessment)
lessons/lesson-02.html  The Pause (discipline)
lessons/lesson-03.html  Your Opening Identity (commitment)
lessons/lesson-04.html  Dare and Defend (courage)
lessons/lesson-05.html  The Loss Is the Lesson (resilience)
lessons/lesson-06.html  Sanjaya's Sight (perspective)
lessons/lesson-07.html  Indraprastha (patience)
lessons/lesson-08.html  Hanuman's Tail (humility)
lessons/lesson-09.html  The Yaksha's Questions (composure)
lessons/lesson-10.html  Karma Without Clinging (self-mastery)
lessons/lesson-template.html   starting point for new lessons
```

Every lesson is complete on its own. The numbered order is the recommended path.

## Add a lesson

1. Copy `lessons/lesson-template.html` to `lessons/lesson-11.html`.
2. Write the content. Keep the five steps: Centre, Idea, Train, Play, Reflect.
3. Add a card to `index.html` above the `ADD NEW LESSON CARDS` comment, with `data-lesson="11"`.
4. Update the lesson count and point the previous lesson's "next" links at the new page.

## Features

- Chess diagrams are drawn from FEN text (`<div class="board" data-fen="...">`), so they work offline and stay editable.
- Lesson 1 scores a 12-question personality quiz and five inner dials. The result is saved in the browser and tailors the tabs in later lessons.
- Notes, counters and checklists autosave in the browser (`localStorage`). Nothing leaves the device.

## Positions

Puzzle positions were checked by hand. Open any of them on an analysis board (link under each diagram) to verify.
