/**
 * Created by Priyanka on 3/16/16.
 */
module.exports = function(app)
{
    app.get('/api/hello',sayHello);
    app.get('/api/user', function (req,res) {
        var user =
        {
            name : "Priyanka"
        }

        res.json(user);
    });

    function sayHello(req,res)
    {
        console.log('say hello!');
        res.send('<h1>Hello!</h1>');
    }
};