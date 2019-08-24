(function () {
    'use strict';
    const userNameInput = document.getElementById('user-name');
    const assessmentButton = document.getElementById('assessment');
    const resultDivided = document.getElementById('result-area');
    const tweetDivided = document.getElementById('tweet-area');

    function removeAllChildren(element) {
        while (element.firstChild) {
           element.removeChild(element.firstChild);
        }
    }
    assessmentButton.onclick = () => {
        const userName = userNameInput.value;
        if (userName.length === 0){
            return;
        }
        removeAllChildren(resultDivided) 
        const header = document.createElement('h3');
        header.innerText = '診断結果';
        resultDivided.appendChild(header);

        const paragraph = document.createElement('p');
        const result = assessment(userName);
        paragraph.innerText = result;
        resultDivided.appendChild(paragraph);
        removeAllChildren(tweetDivided);
        const anchor = document.createElement('a');
        const hrefValue='https://twitter.com/intent/tweet?button_hashtag=おすすめの曲診断&ref_src=twsrc%5Etfw&text='+encodeURIComponent(result);
        anchor.setAttribute('href', hrefValue);
        anchor.className = 'twitter-hashtag-button';
        anchor.innerText = 'Tweet #おすすめの曲診断';
        tweetDivided.appendChild(anchor);
        twttr.widgets.load();
    };

    const answers = [
        '{userName}におすすめの曲は、アニメ「あっちこっち」の『あっちでこっちで』です。',
        '{userName}におすすめの曲は、アニメ「赤髪の白雪姫」の『優しい希望で』です。',
        '{userName}におすすめの曲は、アニメ「赤髪の白雪姫」の『その声が地図になる』です。',
        '{userName}におすすめの曲は、アニメ「あの日見た花の名前を僕たちはまだ知らない」の『secret bose~君がくれたもの~』です。',
        '{userName}におすすめの曲は、アニメ「暗殺教室」の『青春サツバツ論』です。',
        '{userName}におすすめの曲は、アニメ「暗殺教室」の『QUESTION』です。',
        '{userName}におすすめの曲は、アニメ「うたの☆プリンスさまっ♪」の『未来地図』です。',
        '{userName}におすすめの曲は、アニメ「うたの☆プリンスさまっ♪」の『夢追人へSynphony』です。',
        '{userName}におすすめの曲は、アニメ「桜蘭高校ホスト部」の『桜キッス』です。',
        '{userName}におすすめの曲は、アニメ「オオカミ少女と黒王子」の『LOVE GOOD TIME』です。',
        '{userName}におすすめの曲は、アニメ「カーニヴァル」の『偏愛の輪』',
        '{userName}におすすめの曲は、アニメ「暁のヨナ」の『暁の華』',
        '{userName}におすすめの曲は、アニメ「会長はメイド様!」の『My secret』',
        '{userName}におすすめの曲は、アニメ「怪盗ジョーカー」の『怪盗ミラクル少年ボーイ』',
        '{userName}におすすめの曲は、アニメ「革命機ヴァルヴレイヴ」の『Presever Rose』',
        '{userName}におすすめの曲は、アニメ「革命機ヴァルヴレイヴ」の『革命デュアリズム』',
        '{userName}におすすめの曲は、アニメ「神様はじめました」の『神様の神様』',
        '{userName}におすすめの曲は、アニメ「かみちゃまかりん」の『暗国天国』',
        '{userName}におすすめの曲は、アニメ「君に届け」の『きみにとどけ』',
        '{userName}におすすめの曲は、アニメ「繰繰れ!コックリさん」の『Welcome!!DISCOけもけも』',
        '{userName}におすすめの曲は、アニメ「月刊少女野崎くん」の『君じゃなきゃダメみたい』です。',
        '{userName}におすすめの曲は、アニメ「さくら荘のペットな彼女」の『君が夢を連れてきた』です。',
        '{userName}におすすめの曲は、アニメ「ソウルイーター」の『Style.』です。',
        '{userName}におすすめの曲は、アニメ「ソウルイーター」の『それが僕らの道しるべ』です。',
        '{userName}におすすめの曲は、アニメ「ダイヤのA」の『BRAND NEW　BLUE』です。',
        '{userName}におすすめの曲は、アニメ「ディーふらぐ!」の『すているめいと！』です。',
        '{userName}におすすめの曲は、アニメ「東京喰種」の『unravel』です。',
        '{userName}におすすめの曲は、アニメ「夏目友人帳」の『フローリア』です。',
        '{userName}におすすめの曲は、アニメ「のうりん」の『秘密の扉から会いにきて』です。',
        '{userName}におすすめの曲は、アニメ「ノーゲーム・ノーライフ」の『This game』です。',
        '{uesrName}におすすめの曲は、アニメ「ハイキュー」の『イマジネーション』です。',
        '{userName}におすすめの曲は、アニメ「バクマン。」の『Blue　Bird』です。',
        '{userName}におすすめの曲は、アニメ「バトルスピリッツ」の『IN FUTURE!!』です。',
        '{userName}におすすめの曲は、アニメ「干物妹!うまるちゃん」の『かくしん的☆めたもるふぉ〜ぜっ！』です。',
        '{userName}におすすめの曲は、アニメ「プリティーリズム」の『愛しのティンカーベル』です。',
        '{userName}におすすめの曲は、アニメ「僕のヒーローアカデミア」の『ピースサイン』です。',
        '{userName}におすすめの曲は、アニメ「まじっく快斗1412」の『アイのシナリオ』です。',
        '{userName}におすすめの曲は、アニメ「名探偵コナン」の『Greed』です。',
        '{userName}におすすめの曲は、アニメ「メジャー」の『心絵』です。',
        '{userName}におすすめの曲は、アニメ「弱虫ペダル」の『Glory Road』です。',
        '{userName}におすすめの曲は、アニメ「BROTHERS CONFLICT」の『BELOVED×SURVIVAL』です。',
        '{userName}におすすめの曲は、アニメ「魔法科高校の劣等生」の『Rising Hope』です。',
        '{userName}におすすめの曲は、アニメ「Free!」の『Clear Blue Departure』です。',
        '{userName}におすすめの曲は、アニメ「K」の『KINGS』です。',
        '{userName}におすすめの曲は、アニメ「スタミュ」の『DREAMER』です。',
        '{userName}におすすめの曲は、アニメ「探偵チームKZ事件ノート」の『難解ミステリー』です。',
        '{userName}におすすめの曲は、アニメ「俺がお嬢様学校に「庶民サンプル」としてゲッツされた件」の『イチズレシピ』です。',
        '{userName}におすすめの曲は、アニメ「Dance with Devils」の『マドモ☆アゼル』です。',
        '{userName}におすすめの曲は、アニメ「Dance with Devils」の『風邪の予感』です。',
        '{userName}におすすめの曲は、アニメ「プリンス・オブ・ストライド　オルタナティブ」の『Be My Steady』です。',
        '{userName}におすすめの曲は、アニメ「虹色デイズ」の『Rainjbow Days!』です。',
        '{userName}におすすめの曲は、アニメ「少年メイド」の『ずっとOnly you』です。',
        '{userName}におすすめの曲は、アニメ「マジきゅんっ！ルネッサンス」の『マジきゅんっ！No.1☆』です。',
        '{userName}におすすめの曲は、アニメ「ナンバカ」の『ナンバカ脱獄理論』です。',
        '{userName}におすすめの曲は、アニメ「私がモテてどうすんだ」の『Prince×Prince』です。',
        '{userName}におすすめの曲は、アニメ「ガウリールドロップアウト」の『ガウリールドロップキック』です。',
        '{userName}におすすめの曲は、アニメ「小林さんちのメイドラゴン」の『青空のラプソディ』です。',
        '{userName}におすすめの曲は、アニメ「王室教師ハイネ」の『しょっぱい涙』です。',
        '{userName}におすすめの曲は、アニメ「覆面系ノイズ」の『カナリア』です。',
        '{userName}におすすめの曲は、アニメ「ナイツ＆マジック」の『Rebuilt world』です。'
    ];  
    
    function assessment(userName) {
        let sumOfcharCode = 0;
        for (let i = 0; i < userName.length; i++){
            sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);
        }

        const index = Math.floor(Math.random () * 59);
        let result = answers[index];

        result = result.replace(/{userName}/g, userName);
        return result;
    }

    console.log(assessment('太郎'))
    console.log(assessment('次郎'))
    console.log(assessment('太郎'))
    
})();