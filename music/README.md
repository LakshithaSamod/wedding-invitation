# Wedding Website Music Setup

This folder contains all the audio files for your wedding invitation website.

## Required Audio Files

### 1. Background Music (wedding-song.mp3)
**Purpose**: Main background music that loops throughout the website
**Duration**: Any length (will loop continuously)
**Volume**: Set to 50% in code
**Suggestions**:
- Romantic instrumental
- Soft piano or acoustic guitar
- Classical wedding pieces

### 2. Loading Music (loading-music.mp3)
**Purpose**: Plays during the loading screen animation
**Duration**: 2-3 seconds
**Volume**: Set to 60% in code
**Suggestions**:
- Soft chime or bell sound
- Gentle harp sweep
- Ethereal intro music
- Soft orchestral swell

### 3. Reveal Sound (reveal-sound.mp3)
**Purpose**: Plays when loading completes and site is revealed
**Duration**: 1-2 seconds
**Volume**: Set to 70% in code
**Suggestions**:
- Magical sparkle/shimmer sound
- Gentle "whoosh" or wind chime
- Single bell or chime
- Soft "ding" or celebration sound

## How to Add Music Files

1. **Download or prepare your audio files** (MP3 format recommended)

2. **Rename them exactly as**:
   - `wedding-song.mp3` (main background music)
   - `loading-music.mp3` (loading screen music)
   - `reveal-sound.mp3` (reveal transition sound)

3. **Place all files in this folder**: `/home/lakshitha-samod/Projects/wedding-invitation/music/`

4. **Refresh your website**: The audio will automatically play!

## Free Sound Resources

### Music
- **YouTube Audio Library**: https://studio.youtube.com/ (Free, no attribution needed)
- **Free Music Archive**: https://freemusicarchive.org/
- **Incompetech**: https://incompetech.com/music/
- **Bensound**: https://www.bensound.com/

### Sound Effects
- **Freesound**: https://freesound.org/
- **Zapsplat**: https://www.zapsplat.com/
- **Mixkit**: https://mixkit.co/free-sound-effects/
- **BBC Sound Effects**: https://sound-effects.bbcrewind.co.uk/

## Audio Flow

1. 🎵 **Page loads** → `loading-music.mp3` plays
2. ✨ **Loading completes** (2.5s) → Loading music fades out → `reveal-sound.mp3` plays
3. 🎶 **Main site appears** → `wedding-song.mp3` starts (loops continuously)

## Tips

- Keep file sizes small for faster loading (under 5MB each)
- Use MP3 format for best browser compatibility
- Test volume levels - you can adjust them in `script.js`
- Loading and reveal sounds should be SHORT (1-3 seconds)
- Background music can be any length (it loops)

## Current Status

Audio files needed:
- [✓] wedding-song.mp3 - **FOUND!**
- [ ] loading-music.mp3 - Optional (page will work without it)
- [ ] reveal-sound.mp3 - Optional (page will work without it)

## Quick Fix for Missing Audio

If you don't have loading-music.mp3 or reveal-sound.mp3 yet, the website will still work fine! The code gracefully handles missing files. However, to get the full experience:

1. **For loading-music.mp3**: Find a 2-3 second soft intro sound (harp, chime, bells)
2. **For reveal-sound.mp3**: Find a 1-2 second sparkle or "whoosh" sound effect

These are optional - your wedding-song.mp3 is the most important and it's already there!
