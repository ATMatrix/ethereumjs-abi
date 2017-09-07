for (var i = 0; i < 10; i ++){
    setTimeout(function() {
        console.log("tesing i: " + i);
        console.log('Blah blah blah blah extra-blah');
    }, 1000 * i);
}