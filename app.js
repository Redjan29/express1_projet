const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
const mysql = require('mysql2');

// Création de la connexion à la base de données
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'projet_express'
});

// 1)  Récupérer la liste de toutes les tâches
app.get('/tasks', (request, response) => {
    const requete = 'SELECT * FROM tasks'; // Utilisez la connexion à la base de données
    connection.query(requete, function (err, results, fields) {   // Exécutez la requête SQL
    if (err) {
      console.error('Erreur lors de la récupération des tâches :', err);
      response.status(500).json({ error: 'Erreur serveur' });
      return;
    }
    console.log(results);
    response.json(results);
  });
});


//2) récupérer la liste de toutes les tâches non faites
app.get('/UnDone_tasks', (request, response) => {
    const requete = 'SELECT * FROM tasks where Done = 0'; // Utilisez la connexion à la base de données
    connection.query(requete, function (err, results, fields) {   // Exécutez la requête SQL
    if (err) {
      console.error('Erreur lors de la récupération des tâches :', err);
      response.status(500).json({ error: 'Erreur serveur' });
      return;
    }
    console.log(results);
    response.json(results);
  });
});

// 3)Ajouter une nouvelle tâche
app.get('/add_tasks', (request, response) => {
    const name = 'jul'; 
    const done = 1;
  
    // Utilisez la connexion à la base de données et la requête SQL paramétrée
    const requete = 'INSERT INTO tasks (name, done) VALUES (?, ?)';
    connection.query(requete, [name, done], function (err, results, fields) {
      if (err) {
        console.error('Erreur lors de l\'ajout de la tâche :', err);
        response.status(500).json({ error: 'Erreur serveur' });
        return;
      }
      console.log('Tâche ajoutée avec succès.');
      response.json({ message: 'Tâche ajoutée avec succès' });
    });
  });
  
//  4) Marquer une tâche à done
//  5) Modifier une tache existance

app.put('/update_task/:id', (request, response) => {
    const Id = request.params.id; // Récupérez l'ID de la tâche à mettre à jour depuis les paramètres de l'URL
    const newName = 'Malik'; // Remplacez par le nouveau nom que vous souhaitez définir
    const newDone = 0; // Remplacez par le nouvel état que vous souhaitez définir (1 pour "terminé" ou 0 pour "non terminé")
  
    // Utilisez la connexion à la base de données et la requête SQL paramétrée pour mettre à jour la tâche
    const requete = 'UPDATE tasks SET name = ?, Done = ? WHERE Id = ?';
    connection.query(requete, [newName, newDone, Id], function (err, results, fields) {
      if (err) {
        console.error('Erreur lors de la mise à jour de la tâche :', err);
        response.status(500).json({ error: 'Erreur serveur' });
        return;
      }
      console.log('Tâche mise à jour avec succès.');
      response.json({ message: 'Tâche mise à jour avec succès' });
    });
  });

  // 6) supprimer une tâche (bonus)
  app.delete('/delete_task/:id', (request, response) => {
    const Id = request.params.id; // Récupérez l'ID de la tâche à mettre à jour depuis les paramètres de l'URL
   
    // Utilisez la connexion à la base de données et la requête SQL paramétrée pour mettre à jour la tâche
    const requete = 'DELETE FROM tasks WHERE Id = ?';
    connection.query(requete, [Id], function (err, results, fields) {
      if (err) {
        console.error('Erreur lors de la mise à jour de la tâche :', err);
        response.status(500).json({ error: 'Erreur serveur' });
        return;
      }
      console.log('Tâche mise à jour avec succès.');
      response.json({ message: 'Tâche mise à jour avec succès' });
    });
  });


  //  7)Bonus : ajouter une vérification du token
  app.get('/restricted1', (req, res) => { 
  const token = req.header('token');
    if (token === '313') {
      // Si le token est valide, renvoyez un JSON avec "message: topsecret"
      res.status(200).json({ message: 'topsecret' });
    } else {
      // Si le token est incorrect, renvoyez une erreur 403
      res.status(403).json({ error: 'Forbidden' });
    }
  })


// Programmer le port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

