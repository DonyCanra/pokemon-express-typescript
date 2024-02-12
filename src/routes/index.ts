import express from 'express';
import Controller from '../controllers';
const router = express.Router()

// define the home page route
router.get('/', Controller.fetchDatabase)

module.exports = router