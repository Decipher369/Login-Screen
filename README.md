# Login Screen - Golang Web Application

A modern, responsive login screen built with **Golang** backend and vanilla HTML/CSS/JavaScript frontend.

![Login Screen](https://img.shields.io/badge/Go-1.21+-00ADD8?style=flat&logo=go)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🚀 Quick Start

### Prerequisites
- Go 1.21 or higher

### Installation & Running

```bash
# Clone the repository
git clone https://github.com/Decipher369/login-screen.git
cd login-screen

# Run the server
go run main.go
```

Visit **http://localhost:8080** in your browser.

## ✨ Features

- ✅ **Two-panel layout** - Illustration + Login form
- ✅ **Responsive design** - Mobile-first approach
- ✅ **Form validation** - Client & server-side
- ✅ **Clean code** - Efficient and readable
- ✅ **Zero dependencies** - Uses Go stdlib only

## 🎨 Design

- Modern purple accent (#722F5E)
- Warm gradient background
- Skeleton illustration with decorative elements
- Smooth animations and hover effects

## 📁 Project Structure

```
login-screen/
├── main.go                 # Go server entry point
├── go.mod                  # Go module file
├── handlers/
│   └── auth.go            # Authentication handlers
├── templates/
│   └── login.html         # Login page template
└── static/
    ├── css/style.css      # Styling
    ├── js/app.js          # Client-side logic
    └── images/            # Assets
```

## 🛠️ Technology Stack

**Backend:**
- Go (net/http)
- HTML templates
- Template caching

**Frontend:**
- HTML5
- Vanilla CSS
- Vanilla JavaScript
- Google Fonts (Inter)

## 📝 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Login page |
| `/login` | POST | Form submission |
| `/static/*` | GET | Static assets |

## 🎯 Code Quality

- **Efficient**: Template caching, minimal dependencies
- **Readable**: Well-commented, clear structure
- **Validated**: Input validation on both sides

## 📄 License

MIT License - feel free to use this project as you wish!

## 👤 Author

**Decipher369**
- GitHub: [@Decipher369](https://github.com/Decipher369)

---

Built with ❤️ using Go
