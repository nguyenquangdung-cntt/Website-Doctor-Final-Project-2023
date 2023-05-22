const db = require('../model/DBConfig');
const pt = require('../model/FireStore');
const acc = require('../model/Doctor');
const dia = require('../model/DiagnoseDB');
var crypto = require('crypto');

class AppController {
    index(req, res){
        res.send("Helllo World");
    }
    
    async register(req, res){
        let name = req.body.name;
        let usn = req.body.username;
        let pas = req.body.password;
        let role = req.body.role;
        let id = req.body.id;
        const user = await acc.where("username", '==', usn).get();
        if (!user.empty) {
            res.send("Failed");
        }else{
            let data = {
                id:id,
                name: name,
                username: usn,
                role: role,
                password: crypto.createHash('sha256').update(pas).digest('hex')
            }
            await acc.add(data)
            res.send("Success");
        }
    }

    async login(req, res){
        const usn = req.body.username;
        const pas = crypto.createHash('sha256').update(req.body.password).digest('hex');
        const user = await acc.where("username", '==', usn).get();
        const pass = await acc.where("password", "==", pas).get();
        const role1 = await acc.where("username", '==', usn).where("role", "==", "doctor").get();
        const role2 = await acc.where("username", '==', usn).where("role","==","admin").get()
        try {
            if (!pass.empty && !user.empty) {
                if(!role1.empty && role2.empty){
                    user.forEach(doc => {
                        res.send(doc.data());
                    });
                }else{
                    if(role1.empty && !role2.empty){
                        res.send("admin");
                    }
                }
            }else{
                res.send(user.data());
            }   
        } catch (error) {
            res.send(error);
        }
    }

    async deletePatient(req, res){
        const id = req.params.id;
        const snapshot = await pt.where("id", "==", id).get();
        try {
            snapshot.forEach(element => {
                element.ref.delete();
                res.send("Patient delete");
            });            
        } catch (error) {
            console.log(error);
        }
    }

    async addPatient(req, res){
        const data = req.body;
        await pt.add(data);
        res.send({msg: "User add"});
    }
    async listPatients(req, res){
        const snapshot = await pt.orderBy("health","desc").get();
        const list = snapshot.docs.map((doc)=>doc.data());
        res.send(list);
    }
    async getOnePatient(req, res){
        const id = req.params.id;
        const snapshot = await pt.where("id", "==", id).get();
        if (snapshot.empty) {
            console.log('No matching documents.');
        }
        snapshot.forEach(doc => {
            res.send(doc.data());
        });
    }

    /*async updatePatient(req, res){
        const id = req.params.id;
        const diagnosis = req.body.diagnosis;
        const health = req.body.health;
        const snapshot = await pt.where("id", "==", id).get();
        if (snapshot.empty) {
            console.log('Failed');
        }
        snapshot.forEach(doc => {
            const id = doc.id;
            pt.doc(id).update({
                health: health,
                diagnosis: diagnosis
            })
            res.send("Success");
        });
    }*/

    async countPatients(req, res){
        const data = await pt.count().get();
        const data2 = await pt.where("health", "==", "Nhiễm bệnh").count().get();
        const snapshot = await pt.get();
        const list = snapshot.docs.map((doc)=>doc.data());
        //res.send(list.map(doc => doc.day));
        const count = {
            count: data.data().count,
            current: data2.data().count
        }
        res.send(count);    
    }
    async loginPatient(req, res){
        const usn = req.body.username;
        const pas = crypto.createHash('sha256').update(req.body.password).digest('hex');
        const user = await acc.where("username", '==', usn).get();
        const pass = await acc.where("password", "==", pas).get();
        const role = await acc.where("username", '==', usn).where("role", "==", "benhnhan").get();
        try {
            if (!pass.empty && !user.empty && !role.empty) {
                user.forEach(us=>{
                    res.send(us.data());
                })
            }else{
                res.send(user.data());
            }   
        } catch (error) {
            res.send(error);
        }
    }
    async registerPatient(req, res){
        let id = req.body.id;
        let name = req.body.name;
        let usn = req.body.username;
        let pas = req.body.password;
        let role = "benhnhan";
        let phone = '';
        let address = '';
        const user = await acc.where("username", '==', usn).get();
        if (!user.empty) {
            res.send("Failed");
        }else{
            let data = {
                id:id,
                name: name,
                username: usn,
                role: role,
                password: crypto.createHash('sha256').update(pas).digest('hex'),
                phone: phone,
                address: address
            }
            await acc.add(data)
            res.send("Success");
        }
    } 

    async addDiagnose(req, res){
        let health = req.body.health;
        let id = req.body.id;
        const snapshot = await pt.where("id", "==", id).get();
        let diag = req.body;
        await dia.add(diag);
        if (snapshot.empty) {
            console.log('Failed');
        }
        snapshot.forEach(doc => {
            const id = doc.id;
            pt.doc(id).update({
                health: health
            })
            res.send("Success");
        });
    }

    async getDiagnose(req, res){
        const id = req.params.id;
        const snapshot = await dia.where("id", "==", id).get();
        if (snapshot.empty) {
            console.log('No matching documents.');
        }
        const list = snapshot.docs.map((doc)=>doc.data())
        res.send(list.sort(function(a, b) {
            let left = a.date;
            let right = b.date;
            return left === right ? 0 : right > left ? 1 : -1;
          }))
    }

    async getAccount(req, res){
        const snapshot = await acc.orderBy("role","desc").get();
        const list = snapshot.docs.map((doc)=>doc.data());
        res.send(list);
    }

    async deleteAccount(req, res){
        const id = req.params.id;
        const snapshot = await acc.where("id", "==", id).get();
        try {
            snapshot.forEach(element => {
                element.ref.delete();
                res.send("Patient delete");
            });            
        } catch (error) {
            console.log(error);
        }
    }

    async countAccount(req, res){
        const data = await acc.count().get();
        const data2 = await acc.where("role", "==", "doctor").count().get();
        const data3 = await acc.where("role", "==", "benhnhan").count().get();
        const count = {
            count: data.data().count,
            doctor: data2.data().count,
            benhnhan: data3.data().count
        }
        res.send(count);    
    }

    /*async infoPatient(req, res){
        db.ref('users/' + userId).set({
            username: name,
            email: email,
            profile_picture : imageUrl
        }, (error) => {
                if (error) {
                    console.log(error);
                }
            }
        );
    }*/
}

module.exports = new AppController;