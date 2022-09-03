const mongoose = require('mongoose')
const ProduitSchema = require('../models/produit')

const Produit = mongoose.model('Produit', ProduitSchema)

exports.creerProduit = (req, res, next) => {
    delete req.body._id                      // ici on supprime l'id généré automatiquement
    const produit = new Produit({
        ...req.body
    })
    produit.save()
        .then(res.redirect('/produits'))
}

exports.getProduits = (req, res, next) => {
    Produit.find({}, (err, produit) => {
        if (err) {
            res.send(err)
        }
        res.json(produit)
    })
}
exports.getProduitById = (req, res, next) => {
    Produit.findOne({ _id: req.params.id })
        .then((produit) => res.status(200).json(produit))
        .catch(error => res.status(400).json({ error }));
}

exports.updateProduit = (req, res, next) => {
    Produit.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
}