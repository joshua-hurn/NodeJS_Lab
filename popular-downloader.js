const path = require("path");
const fs = require("fs");
const rp = require("request-promise");
let options = {
    encoding: 'binary'
};
let articleArr = [];
let articleDownloadArr = [];

rp("https://reddit.com/r/popular.json")
    .then(data => {
        let parsedData = JSON.parse(data);

        parsedData.data.children.forEach(parsedArticle => {
            let articlesURL = {
                id: parsedArticle.data.id,
                url: parsedArticle.data.url
            };
            articleArr.push(articlesURL);
        })

        articleArr.forEach(obj => {
            if (path.extname(obj.url)) {
                articleDownloadArr.push(obj)
                rp(obj.url, options)
                    .then(data => {
                        fs.writeFile(`./downloads/${obj.id}${path.extname(obj.url)}`, data, options, (err) => {
                            console.log(`There was an error: ${err}`);
                        })
                    })
            }
        });
    })
    .catch(err => {
        console.log("Error, but keep going");
        console.log(err);
    });