const appRouter = require('./app');

function route(app){

    app.use('/', appRouter);

    app.use('/diagnose', appRouter);

    app.use('/delete', appRouter);
    
    app.use('/deleteAcc', appRouter);

    app.use('/addPatient', appRouter);
    
    app.use('/addRecord', appRouter);

    app.use('/addDia', appRouter);

    app.use('/listRecord', appRouter);

    app.use('/listAcc', appRouter);

    app.use('/count', appRouter);

    app.use('/countAcc', appRouter);

    app.use('/login', appRouter);

    app.use('/loginpt', appRouter);

    app.use('/regpt', appRouter);

    app.use('/reg', appRouter);

    //app.use('/update', appRouter);
}

module.exports = route;