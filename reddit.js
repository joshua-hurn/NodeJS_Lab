const path = require('path');
const fs = require('fs');
const rp = require('request-promise');

const articlePath = path.join(__dirname, './popular-articles.json');

rp('https://reddit.com/r/popular.json')
    .then(data => {
        let parsedData = JSON.parse(data);
        let articleArr = [];
        
        parsedData.data.children.forEach(parsedArticle => {
            let articles = {
                author: parsedArticle.data.author,
                title: parsedArticle.data.title,
                url: parsedArticle.data.url,
            }

            articleArr.push(articles);
        });

        console.log(articleArr);

        fs.writeFile(articlePath, JSON.stringify(articleArr, null, 2), (err) => {
            if (err) console.log(err);
        })
    })
    .catch(err => {
        console.log('There was an error');
        console.log(err);
    });