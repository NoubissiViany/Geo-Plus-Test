# Application Web de Galerie d’Images

## 📌 Description

C’est une application web simple qui permet aux utilisateurs de **téléverser des fichiers image** vers un serveur backend et de les visualiser dans une **galerie sur le frontend**.

- **Frontend** : Développé avec Angular, TailwindCSS et Axios pour les appels API.
- **Backend** : Développé avec Node.js, Express et Multer pour la gestion des fichiers.

---

## 🚀 Fonctionnalités

- Téléversement d’images depuis le navigateur
- Stockage des images sur le serveur backend
- Affichage des images dans une galerie responsive
- Possibilité de **télécharger les images depuis la galerie**
- Interface moderne avec TailwindCSS

---

## 🛠️ Pile technologique

### Frontend

- Angular 20+
- TailwindCSS
- Axios
- RxJS

### Backend

- Node.js
- Express
- Multer (gestion des téléversements)
- CORS

---

## 📂 Structure du projet

```
.
├── frontend/   # Application Angular pour l’interface et la galerie
├── backend/    # Serveur Node.js pour la gestion des téléversements
└── README.md
```

---

## ⚡ Installation & Exécution

### Backend

```bash
cd backend
npm install
npm run dev   # ou npm start
```

Serveur par défaut : `http://localhost:3000`

### Frontend

```bash
cd frontend
npm install
npm start
```

Application frontend par défaut : `http://localhost:4200`

---

## 📸 Utilisation

1. Ouvrez l’application frontend dans votre navigateur.
2. Téléversez une image via le formulaire.
3. Le backend stocke l’image et renvoie son chemin d’accès.
4. L’image apparaît dans la galerie.
5. Cliquez sur une image pour la **télécharger**.

---

## 📄 Licence

Ce projet est distribué sous licence **ISC**.
