# 🚀 AI-Powered Social Media Post Generator

An AI-powered tool to generate engaging social media posts for various platforms like Instagram, Facebook, Twitter, and more. Easily create viral and high-quality content with AI automation.

## 🌟 Features
- AI-generated social media posts
- Supports multiple platforms (Instagram, Facebook, Twitter, LinkedIn, etc.)
- Customizable post templates
- User-friendly interface
- Scheduled posting capabilities
- Hashtag and keyword suggestions

---

## 📦 Installation

### **1. Clone the Repository**
```bash
git clone https://github.com/yourusername/social-post-generator.git
cd social-post-generator
```

### **2. Install Dependencies**
#### **Backend (Node.js & Express)**
```bash
cd backend
npm install
```
#### **Frontend (Next.js)**
```bash
cd frontend
npm install
```

### **3. Set Up Environment Variables**
Create a `.env` file in the backend directory and add:
```env
OPENAI_API_KEY=your_openai_api_key
DATABASE_URL=your_database_connection
```

### **4. Run the Application**
#### **Backend**
```bash
cd backend
npm start
```
#### **Frontend**
```bash
cd frontend
npm run dev
```

The app should now be running on `http://localhost:3000` 🎉

---

## 📜 API Endpoints
### **Generate Post**
```http
POST /api/generate
```
**Request Body:**
```json
{
  "platform": "Twitter",
  "topic": "Tech Trends",
  "tone": "Informative"
}
```
**Response:**
```json
{
  "post": "🚀 AI is revolutionizing the tech industry! Are you ready for the future? #TechTrends #AI"
}
```

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing
We welcome contributions! Please fork the repo, create a branch, and submit a pull request.

---

## 📩 Contact
For support or inquiries, contact us at **support@yourdomain.com** or open an issue.

Happy Posting! 🚀
