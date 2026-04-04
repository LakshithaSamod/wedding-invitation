# 💐 Wedding Invitation Website

A beautiful, romantic wedding invitation website with a floral theme, blush & gold color palette, and rich animations.

## ✨ Features

- 🌸 **Romantic & Floral Design** - Watercolor floral elements, blush pink & rose gold colors
- ⏱️ **Animated Countdown Timer** - Live countdown to ceremony time
- 🎵 **Background Music** - Auto-play with mute control
- 🌺 **Falling Petals Animation** - Subtle, dreamy falling rose petals
- 📸 **Photo Gallery** - 3-column grid with lightbox (click to enlarge)
- 🎨 **Parallax Scrolling** - Beautiful depth effects
- 📍 **Google Maps Integration** - Embedded venue location
- 📝 **RSVP & Wishes Forms** - Google Forms integration
- 📱 **Mobile-First Design** - Optimized for phones and tablets
- 🎯 **Smooth Scroll Navigation** - Floating navigation dots
- ⚡ **Loading Animation** - Beautiful 2.5s floral intro

## 🚀 Quick Start

### 1. Customize Your Content

Open `index.html` and update:

- **Line 8**: Change page title
- **Line 45-49**: Update couple names in loading screen
- **Line 84-86**: Update couple names in hero section
- **Line 87**: Update tagline
- **Line 121-133**: Update wedding date, time, and ceremony details
- **Line 141-142**: Update venue name and address
- **Line 145**: Update Google Maps embed URL (see below)
- **Line 155**: Update "Get Directions" link
- **Line 167-189**: Update schedule timeline
- **Line 251-260**: Add your RSVP Google Form
- **Line 270-279**: Add your Wishes Google Form
- **Line 288-300**: Update contact information

### 2. Set Wedding Date & Time

Open `script.js` and update **line 7**:

```javascript
const WEDDING_DATE = new Date('2024-06-15T14:00:00'); // YYYY-MM-DDTHH:MM:SS
```

### 3. Add Google Forms

#### Create RSVP Form:
1. Go to [Google Forms](https://forms.google.com)
2. Create a new form with fields:
   - Guest Name(s) (Short answer)
   - Email (Email)
   - Phone Number (Short answer, optional)
   - Number of Guests Attending (Number or dropdown: 1, 2, 3, 4)
   - Attending? (Multiple choice: Yes / No)
   - Dietary Restrictions (Short answer, optional)
   - Comments (Paragraph, optional)
3. Click **Send** button → Click **< >** (Embed HTML) icon
4. Copy the `<iframe>` code
5. In `index.html`, replace the `.form-placeholder` div at **line 251** with your iframe
6. Responses will automatically save to Google Sheets (click "Responses" tab in your form)

#### Create Wishes/Guestbook Form:
1. Create another Google Form with fields:
   - Your Name (Short answer)
   - Your Message/Wishes (Paragraph)
   - Email (Email, optional)
2. Get embed code (same as above)
3. In `index.html`, replace the `.form-placeholder` div at **line 270** with your iframe

**Example iframe code:**
```html
<iframe
    src="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true"
    width="100%"
    height="800"
    frameborder="0"
    marginheight="0"
    marginwidth="0">
    Loading…
</iframe>
```

### 4. Update Google Map

1. Go to [Google Maps](https://www.google.com/maps)
2. Search for your venue address
3. Click **Share** → **Embed a map**
4. Copy the `<iframe>` code
5. In `index.html`, replace the iframe at **line 145-153**

### 5. Add Background Music (Optional)

1. Add your wedding song MP3 file to the project folder (e.g., `music/wedding-song.mp3`)
2. In `index.html` at **line 60**, uncomment and update:
```html
<source src="music/wedding-song.mp3" type="audio/mpeg">
```

**Note:** Most browsers block auto-play with sound. Users may need to click the music button to start playback.

### 6. Replace Photos (Optional)

The site uses beautiful stock photos from Unsplash. To use your own photos:

1. Add photos to the `images/` folder
2. Update image URLs in `index.html`:
   - **Hero background** (line 86): Replace background image URL
   - **Gallery photos** (lines 196-222): Replace each `data-image` and `img src` URL

**Example:**
```html
<div class="gallery-item" data-image="images/photo1.jpg">
    <img src="images/photo1.jpg" alt="Our photo 1">
    ...
</div>
```

## 🌐 Deploy to GitHub Pages (Free Hosting)

### Method 1: Using Git Commands

1. **Initialize Git repository:**
```bash
cd /home/lakshitha-samod/Projects/wedding-invitation
git init
git add .
git commit -m "Initial commit - Wedding invitation website"
```

2. **Create GitHub repository:**
   - Go to [GitHub](https://github.com) and create a new repository (e.g., `wedding-invitation`)
   - Don't initialize with README (your project already has files)

3. **Push to GitHub:**
```bash
git remote add origin https://github.com/YOUR_USERNAME/wedding-invitation.git
git branch -M main
git push -u origin main
```

4. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages** (left sidebar)
   - Under "Source", select **main** branch and **/ (root)** folder
   - Click **Save**
   - Your site will be live at: `https://YOUR_USERNAME.github.io/wedding-invitation/`

### Method 2: Using GitHub Desktop

1. Download [GitHub Desktop](https://desktop.github.com)
2. Open GitHub Desktop → **File** → **Add Local Repository**
3. Select your project folder
4. Click "Create Repository" if prompted
5. Click **Publish repository** to GitHub
6. Follow step 4 above to enable GitHub Pages

## 📱 Test Your Site

### Local Testing:
Simply open `index.html` in your web browser:
```bash
cd /home/lakshitha-samod/Projects/wedding-invitation
xdg-open index.html  # Linux
# or just double-click index.html
```

### Test on Mobile:
1. Deploy to GitHub Pages (see above)
2. Open the GitHub Pages URL on your phone
3. Or use browser DevTools (F12) → Toggle device toolbar

## 🎨 Customization Tips

### Change Colors:
Edit `styles.css` lines 7-14 to change the color palette:
```css
:root {
    --blush-pink: #f4e4e6;    /* Light pink background */
    --rose-gold: #b76e79;      /* Primary accent color */
    --cream: #faf7f5;          /* Background cream */
    /* etc. */
}
```

### Adjust Animations:
In `script.js`:
- **Line 7**: Change wedding date
- **Line 8**: Adjust petal count (10-15 recommended)
- **Line 17**: Change loading screen duration (default 2500ms)

### Change Fonts:
In `index.html` line 11, replace Google Fonts link with your preferred fonts, then update `styles.css`:
- **Line 34**: Change body font
- **Line 129, 274, etc.**: Change heading font

## 📂 File Structure

```
wedding-invitation/
├── index.html          # Main HTML file (all content)
├── styles.css          # All styling and animations
├── script.js           # Interactive features
├── README.md           # This file
└── images/             # Folder for your photos (optional)
```

## 🐛 Troubleshooting

### Music not auto-playing:
- Most browsers block auto-play. This is normal.
- Guests can click the music button in the bottom-right corner.

### Google Forms not showing:
- Make sure you replaced the `.form-placeholder` div with the actual `<iframe>` code
- Check that the iframe URL is correct
- Ensure the form is set to accept responses

### Map not showing:
- Verify the Google Maps embed URL is correct
- Check your internet connection (maps require online access)

### Countdown showing 00:00:00:
- Check that the `WEDDING_DATE` in `script.js` is in the future
- Format must be: `YYYY-MM-DDTHH:MM:SS`

### Site not showing on GitHub Pages:
- Wait 5-10 minutes after enabling GitHub Pages
- Check that repository is public (or you have GitHub Pro for private pages)
- Verify the file is named exactly `index.html` (lowercase)

## 📧 Support

For questions or issues:
- Check this README thoroughly
- Search [Stack Overflow](https://stackoverflow.com)
- Review HTML/CSS/JavaScript in the code comments

## 💕 Credits

- **Design**: Romantic & Floral theme with blush pink & rose gold palette
- **Fonts**: [Google Fonts](https://fonts.google.com) - Great Vibes & Cormorant
- **Stock Photos**: [Unsplash](https://unsplash.com) - Beautiful wedding photography
- **Icons**: Unicode emoji characters
- **Forms**: [Google Forms](https://forms.google.com) - Free form builder with Sheets integration

## 📄 License

Free to use and customize for your wedding! Enjoy your special day! 💐

---

**Made with love** ❤️

*Congratulations on your upcoming wedding!*
