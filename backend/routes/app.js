const express = require('express');
const router = express.Router();

const appController = require('..//controller/AppController');

router.get('/', appController.index);
router.post('/addPatient', appController.addPatient);
router.post('/addDia', appController.addDiagnose);
router.get('/listRecord', appController.listPatients);
router.get('/listAcc', appController.getAccount);
router.get('/count', appController.countPatients);
router.get('/countAcc', appController.countAccount);
router.get('/:id', appController.getOnePatient);
router.get('/diagnose/:id', appController.getDiagnose);
router.delete('/delete/:id', appController.deletePatient);
router.delete('/deleteAcc/:id', appController.deleteAccount);
router.post('/login', appController.login);
router.post('/loginpt', appController.loginPatient);
router.post('/reg', appController.register);
router.post('/regpt', appController.registerPatient);
//router.post('/update/:id', appController.updatePatient);


module.exports = router;