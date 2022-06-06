#! /usr/bin/env node

console.log(
  "This script populates some test games, genres, consoles, and accessories to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/video_game_inventory?retryWrites=true"
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require("async");
const bcrypt = require("bcryptjs");
var User = require("./models/user");
var Post = require("./models/post");
var Comment = require("./models/comment");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var users = [];
var posts = [];
var comments = [];

function userCreate(first_name, last_name, username, password, cb) {
  var user = new User({
    first_name,
    last_name,
    username,
  });

  // bcrypt.hash(password, 10, (err, hashedPassword) => {
  //   if (err) {
  //     return next(err);
  //   }
  //   user.password = hashedPassword;
  //   user.save(function (err) {
  //     if (err) {
  //       return cb(err, null);
  //     }
  //     console.log("New User: " + user);
  //     users.push(user);
  //     cb(null, user);
  //   });
  // });

  user.password = password;
  user.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New User: " + user);
    users.push(user);
    cb(null, user);
  });
}

function postCreate(author, title, body, published, publish_date, img_url, cb) {
  var post = new Post({
    author,
    title,
    body,
    published,
    publish_date,
    img_url,
  });

  post.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Post: " + post);
    posts.push(post);
    cb(null, post);
  });
}

function commentCreate(name, text, post, timestamp, cb) {
  var comment = new Comment({
    name,
    text,
    post,
    timestamp,
  });

  comment.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Comment: " + comment);
    comments.push(comment);
    cb(null, comment);
  });
}

function createUsers(cb) {
  async.series(
    [
      function (callback) {
        userCreate("Leonard", "Day", "theapartment", "pass", callback);
      },
      function (callback) {
        userCreate("Alex", "Morris", "chocolatebar", "pass", callback);
      },
    ],
    // optional callback
    cb
  );
}

function createPosts(cb) {
  async.series(
    [
      function (callback) {
        postCreate(
          users[0],
          "Called promise likewise three",
          "Narrow frankness instrument situation before four consider pasture dearest your head discovered attempt endeavor. Give company least repeated than place conduct walk direction marianne men. Seen interested repeated repair bringing met plan sake provided dinner party warrant am advantage having. Considered post those gentleman invited oppose. Men correct nothing table he dine wholly object now having.",
          true,
          Date.now(),
          "https://i.imgur.com/QZ5lNQQ.jpg",
          callback
        );
      },
      function (callback) {
        postCreate(
          users[1],
          "Delay boy friends own improve drawings",
          "Five formed remember possession consider deal hung very screened engrossed furnished advantage. Devonshire man increasing preferred shewing years suffering. Want family their forbade folly giving alteration sometimes luckily for draw end desire regret misery. Forming advantages enabled seemed innate mutual dearest him defective advantage attention really while exercise really arose literature. Sudden endeavor view thrown simplicity sing replied agreeable door discovery announcing interested dissimilar tore seen engage cousin.",
          true,
          Date.now(),
          "https://i.imgur.com/F1FiqmL.jpg",
          callback
        );
      },
      function (callback) {
        postCreate(
          users[0],
          "Delicate open told expression improve",
          "Five formed remember possession consider deal hung very screened engrossed furnished advantage. Devonshire man increasing preferred shewing years suffering. Want family their forbade folly giving alteration sometimes luckily for draw end desire regret misery. Forming advantages enabled seemed innate mutual dearest him defective advantage attention really while exercise really arose literature. Sudden endeavor view thrown simplicity sing replied agreeable door discovery announcing interested dissimilar tore seen engage cousin.",
          true,
          Date.now(),
          "https://i.imgur.com/ND85zWv.jpg",
          callback
        );
      },
      function (callback) {
        postCreate(
          users[1],
          "Discourse tore prevent front",
          "Old sigh known rendered. Pleasure may delay brother warrant branch perfectly past ample lovers good months defective civil belonging preferred father. Dashwoods sons offended. Both contented abode among seven drawn procured. Income difficult real ecstatic course knew parish wrote myself going given judgment reached prepare in ye enquire.",
          true,
          Date.now(),
          "https://i.imgur.com/79QX4xq.jpg",
          callback
        );
      },
      function (callback) {
        postCreate(
          users[0],
          "Maids enough properly equal farther",
          "Call income appear timed remainder dining lived lovers followed had these mistaken lain thing peculiar moments opinions. Hastened sight way past. Songs shameless give easy son vicinity nature although after formal greatly sufficient worthy. Read avoid them tell young money missed need. Their improved said settling.",
          true,
          Date.now(),
          "https://i.imgur.com/phROXAU.jpg",
          callback
        );
      },
      function (callback) {
        postCreate(
          users[1],
          "Ferrars child money looked",
          "Regard equally him their appearance truth agreed consulted absolute inhabiting. Exeter our affronting. Charmed graceful am delivered wishing really. Make felicity dear eldest affixed pleased high without declared innate sing. Dearest large give comfort elderly demesne intention.",
          true,
          Date.now(),
          "https://i.imgur.com/5m7G1lF.jpg",
          callback
        );
      },
      function (callback) {
        postCreate(
          users[0],
          "Thrown proceed rapid knew",
          "Songs late country property throwing depend style unable simplicity compact long five. Regard collecting give rejoiced saw latter many cottage recurred again fully spoil. Purse brought abode when. Myself left words open instantly certain improved smiling however minutes delicate situation song defer. Old endeavor offending natural week meant prospect up when affixed correct.",
          true,
          Date.now(),
          "https://i.imgur.com/PVaO8b4.jpg",
          callback
        );
      },
      function (callback) {
        postCreate(
          users[1],
          "Resolving wife immediate full removed attempt",
          "Dissuade answer old perhaps believe tears greatest ourselves form literature tried. Extremely arrival rooms daughter went another demesne. Direction rent formed gentleman ample maids. Why invited learning end put learning warrant. Yet inquietude themselves temper next real lasting busy  preserved worthy elegance an.",
          true,
          Date.now(),
          "https://i.imgur.com/cF3OzA1.jpg",
          callback
        );
      },
      function (callback) {
        postCreate(
          users[0],
          "About understood enough few abroad",
          "Apartments feeling diverted rest although wonder distant affronting burst opinion motionless among off ask burst improving. Listening literature abode passed known entrance ashamed ye others rich their husband from dear little evening amiable. Contained wholly around continue piqued in insipidity between brother delivered thoughts mind strangers prosperous absolute hold friendly. Were shutters suppose you week surprise abroad six walls. Deal limited coming play branch saved off carried up those conduct expect strictly fancy blush.",
          true,
          Date.now(),
          "https://i.imgur.com/K1TLEEa.jpg",
          callback
        );
      },
      function (callback) {
        postCreate(
          users[1],
          "Ample addition suspected latter",
          "Three bed small inhabit doors denied cottage pretended. Case mind ashamed by mutual danger received unpleasant own. Child conviction examine particular more smiling against literature. Over concerns fifteen alteration otherwise chief melancholy tended regular enough. Course may like many beauty friends large evening invited savings discovery improving law sufficient.",
          true,
          Date.now(),
          "https://i.imgur.com/wTvuaTt.jpg",
          callback
        );
      },
      function (callback) {
        postCreate(
          users[0],
          "Four leave improved twenty",
          "Cheerful easily body equally removed excellent full fruit. Written thirty most smallness regular point west point resembled believed fond considered each. Fail nay delivered income times lived views delay contented my breeding trifling. Order children remarkably sussex imprudence been rooms dining mirth any worth thrown. Nearer village bred household the hill outweigh smallest.",
          true,
          Date.now(),
          "https://i.imgur.com/9y1bNF0.jpg",
          callback
        );
      },
      function (callback) {
        postCreate(
          users[1],
          "Each scale twenty astonished",
          "Excellent opinions gate whether end worth strangers marry yourself attempted most departure plate twenty admitted. Post like hard strongly shade hunted. No estate regard the amongst together started village expenses new proposal rank secure. Alteration unknown own mention wholly child amongst solid prospect least dining speedily consisted poor hunted procured conduct. Depend disposal attacks procuring society sudden hold gay breakfast valley exeter upon away.",
          true,
          Date.now(),
          "https://i.imgur.com/flzNuxe.jpg",
          callback
        );
      },
      function (callback) {
        postCreate(
          users[0],
          "However blushes rapid sorry procured too",
          "Discovery narrow arrival account wandered formal so. Sussex norland trees questions resources bred means appear guest miss. Hardly additions minuter conviction or beyond eagerness. Immediate attachment trees smile feebly ecstatic followed roused seen held remainder landlord points weeks. Assured it figure address assurance kindness preserved.",
          true,
          Date.now(),
          "https://i.imgur.com/26RYvWt.jpg",
          callback
        );
      },
      function (callback) {
        postCreate(
          users[1],
          "Incommode them become leave confined",
          "Talked her just wooded greatest hastily delicate sent after gate. Enabled express extremely matter attended it amongst or. Fanny real plenty feet studied that incommode exeter enquire were resolution went genius increasing formed sitting middletons. Principle forty shed matter drawings on warmly lasted. Removing gentleman those plenty consider linen frankness blind pressed outweigh.",
          true,
          Date.now(),
          "https://i.imgur.com/MgUYcbz.jpg",
          callback
        );
      },
      function (callback) {
        postCreate(
          users[0],
          "Left exeter hand game attention something pulled",
          "Leaf inquiry denoting. Fortune last need appear confined defer. Possession simplicity nothing extensive told laughter only hope four great. Smallness hills blessing misery conviction regard chiefly replied indulged material good enjoy eyes balls praise decay gentleman. Although forth inquietude meet worth.",
          true,
          Date.now(),
          "https://i.imgur.com/X2z2QEZ.jpg",
          callback
        );
      },
      function (callback) {
        postCreate(
          users[1],
          "Since old must carried old",
          "Own produced behaviour seems admitting misery outward otherwise limits appearance comfort consider. Sudden balls form pasture but decay want. Determine admiration leave happen just enjoyment shew. Matters offices burst jointure garden advantage great cordially indeed subject provision aware plate looking musical civil hard. Edward enjoyment other perpetual instantly friendship stimulated improving.",
          true,
          Date.now(),
          "https://i.imgur.com/s7i7Dpb.jpg",
          callback
        );
      },
      function (callback) {
        postCreate(
          users[0],
          "Marriage make reached talking believed",
          "Many pressed stand fully songs pulled hour situation open norland replied your settling most private concern temper. Unreserved exercise most chamber abroad attending hardly theirs marianne happen purse. Otherwise shewing weeks cheerful must bore needed daughters remainder. Entrance linen thoroughly incommode remain secure drew several dejection wooded. Necessary possession smile attending collected be about worth contented satisfied rest.",
          true,
          Date.now(),
          "https://i.imgur.com/LyrqeRi.jpg",
          callback
        );
      },
      function (callback) {
        postCreate(
          users[0],
          "Wishes voice tell known basket",
          "Find wandered delay called bachelor happiness apartments secure scarcely place wondered repulsive if looked world rapid. Interested spot prepared this bred impossible by resolving improved you decay. Situation produced your danger ecstatic mrs diverted age friendly. Case viewing discourse together greatest him. That preserved acceptance away insipidity sociable dare intention sooner hung.",
          true,
          Date.now(),
          "https://i.imgur.com/5hBLP53.jpg",
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

function createComments(cb) {
  async.series(
    [
      function (callback) {
        commentCreate(
          "Philhippic",
          "She sincerity ask the fruit discretion convinced on. Known differed instantly. Discourse was admiration judgment form. Dinner sportsman herself offence extended request remember civilly whether these after conduct post will longer door indulged. Truth temper fulfilled.",
          posts[0],
          Date.now(),
          callback
        );
      },
      function (callback) {
        commentCreate(
          "Pandemonium",
          "Cause view drawings morning enabled child front least melancholy. Repulsive knew recurred again fortune formerly surrounded nature procured it talking cease been said. Snug compliment dine joy merry furnished express lady. Collecting strictly talking ought right your. Charmed themselves adieus explain solicitude required throwing alteration far.",
          posts[9],
          Date.now(),
          callback
        );
      },
      function (callback) {
        commentCreate(
          "BrigadJazzbo",
          "Regular fifteen written gentleman celebrated meet yet none long behind comfort. Now there relation help handsome year demesne still objection ready front supposing. Last improving strictly. Bred shall dull ladyship. Pleased hardly between true is replied drawings through several is correct securing projection.",
          posts[9],
          Date.now(),
          callback
        );
      },
      function (callback) {
        commentCreate(
          "Aestheticism",
          "Praise kindness after court danger occasional debating pulled matter daughters ecstatic round fact looking. Chapter out alone performed limited know repeated surprise expense little remember friendly visit children behaved. Suffering reasonably sitting raptures share. Them noisy neat sorry unable. Unknown sell done belonging  arrival behind.",
          posts[17],
          Date.now(),
          callback
        );
      },
      function (callback) {
        commentCreate(
          "Schtick",
          "Visit may trees natural fruit point judgment future. Tried object concluded perpetual minuter ashamed engage whole. Ladies cold high impossible amounted marry become around. Highest game outward delightful offices friendship intention pleasant suffer thing. All went distance after lain mention size share get shall poor.",
          posts[17],
          Date.now(),
          callback
        );
      },
      function (callback) {
        commentCreate(
          "Pulicine",
          "Interested eat drift. Been wholly leaf hard in suspicion replied engaged. Sussex cottage amongst prospect valley viewing. Indeed earnestly discourse worse sufficient removed indulgence ye pasture their. Throwing wrote commanded drift.",
          posts[17],
          Date.now(),
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [createUsers, createPosts, createComments],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
