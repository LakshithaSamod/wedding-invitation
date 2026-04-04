# SEO Setup Instructions

## ✅ What Was Added

All comprehensive SEO meta tags have been added to your wedding invitation website:

### Files Added/Modified:
1. **index.html** - Added comprehensive meta tags
2. **site.webmanifest** - PWA support (new file)
3. **robots.txt** - Search engine crawling rules (new file)
4. **sitemap.xml** - Sitemap for search engines (new file)

---

## 🔧 What You Need to Update Before Deployment

### 1. Replace ALL instances of "yourdomain.com" with your actual domain

**Files to update:**
- `index.html` (lines with canonical, og:url, twitter:url, og:image, twitter:image)
- `robots.txt` (Sitemap URL)
- `sitemap.xml` (all <loc> tags)

**Find and Replace:**
```
Find: https://yourdomain.com/
Replace with: https://your-actual-domain.com/
```

### 2. Create Open Graph Preview Image

You need to create a preview image that appears when someone shares your site on social media:

**Requirements:**
- **File name:** `wedding-preview.jpg`
- **Location:** `/images/wedding-preview.jpg`
- **Dimensions:** 1200px × 630px (recommended)
- **File size:** Under 1MB
- **Content:** Should show couple's photo or wedding design

**Quick way to create:**
1. Take a screenshot of your hero section
2. Resize to 1200 × 630 pixels using:
   - Photoshop
   - GIMP (free)
   - Canva.com (free)
   - Online image resizer

### 3. Create Favicon Files

You need to create multiple favicon sizes:

**Required files:**
- `favicon.ico` (16x16 + 32x32 multi-size)
- `apple-touch-icon.png` (180x180)
- `favicon-32x32.png` (32x32)
- `favicon-16x16.png` (16x16)
- `favicon-192x192.png` (192x192 for Android)
- `favicon-512x512.png` (512x512 for Android)

**Easy way to generate all at once:**
1. Go to https://realfavicongenerator.net/
2. Upload a square image (at least 512x512)
3. Download the generated package
4. Extract all files to your project root

**Or use:**
- https://favicon.io/ (free, simple)
- https://www.favicon-generator.org/

### 4. Update Date in sitemap.xml

In `sitemap.xml`, update:
```xml
<lastmod>2026-04-04</lastmod>
```
Change to your actual deployment date.

---

## 📋 SEO Features Included

### Meta Tags Added:
✅ **Primary Meta Tags**
- Enhanced title with date
- Detailed description (160 characters)
- Keywords
- Author information
- Theme color

✅ **Open Graph Tags** (Facebook, LinkedIn, WhatsApp)
- Type, URL, title, description
- Image with dimensions
- Site name and locale

✅ **Twitter Card Tags**
- Large image card
- Title, description, image

✅ **Additional SEO**
- Format detection for phone/email/date
- Robots meta tag
- Canonical URL
- Favicon links

### Files Created:
✅ **site.webmanifest** - PWA support
- Makes site installable on mobile
- Adds home screen icon
- Enables standalone mode

✅ **robots.txt** - Search engine instructions
- Allows all crawlers
- Points to sitemap

✅ **sitemap.xml** - Site structure
- All major sections listed
- Priority and update frequency set

---

## 🚀 After Deployment

### 1. Submit to Google Search Console
1. Go to https://search.google.com/search-console
2. Add your property (domain)
3. Verify ownership
4. Submit sitemap: `https://yourdomain.com/sitemap.xml`

### 2. Test Social Media Previews

**Facebook/LinkedIn:**
- https://developers.facebook.com/tools/debug/
- Enter your URL and click "Scrape Again"

**Twitter:**
- https://cards-dev.twitter.com/validator
- Enter your URL

**WhatsApp:**
- Just send the link in a chat to see preview

### 3. Test SEO Score

Check your site with:
- https://pagespeed.web.dev/ (Google PageSpeed)
- https://www.seobility.net/en/seocheck/
- https://www.seoptimer.com/

---

## 🎯 Expected Results

When someone shares your link, they'll see:
- **Title:** "Lakshitha & Supuni - Wedding Invitation | June 3rd, 2027"
- **Description:** Your detailed wedding description
- **Image:** Your preview image (once you add it)

On mobile:
- "Add to Home Screen" option
- Standalone app-like experience
- Custom theme color

In search results:
- Rich, detailed snippets
- Proper indexing of all sections
- Better ranking for wedding-related searches

---

## ⚠️ Important Notes

1. **Update ALL "yourdomain.com"** - This is critical!
2. **Create preview image** - Without it, social shares won't look good
3. **Create favicons** - Browser tabs need icons
4. **Test before sharing** - Use the debugging tools above

---

## 📞 Need Help?

If you need assistance with:
- Creating the preview image
- Generating favicons
- Setting up custom domain
- Submitting to search engines

Just ask! 🎉
