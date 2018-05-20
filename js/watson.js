function analyze() {
    var textToAnalyze = $('#analysis-text').val();
    
    $.ajax({
        type: 'POST',
        url: 'https://cors-anywhere.herokuapp.com/https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2017-09-21',
        headers: {
            'Content-Type': 'text/plain;charset=utf-8',
            'Accept': 'application/json',
            'Content-Language': 'en',
            'Accept-Language': 'en',
            'Authorization': 'Basic ' + btoa('27ed9380-b340-408c-b554-7057f3beb6f8:YNBdZB8Xrjmk')
        },
        data: textToAnalyze
    }).done(function(data) {
        var docTones = data.document_tone.tones;
        var sentTones = data.sentences_tone;
        var docToneTableInnerHTML = '';
        var sentToneTableInnerHTML = '';
        
        docTones.forEach(function(docTone) {
            if(docTone.tone_name == 'Anger') {
                var className = 'tone-anger';
            } else if(docTone.tone_name == 'Fear') {
                var className = 'tone-fear';
            } else if(docTone.tone_name == 'Joy') {
                var className = 'tone-joy';
            } else if(docTone.tone_name == 'Sadness') {
                var className = 'tone-sadness';
            } else if(docTone.tone_name == 'Analytical') {
                var className = 'tone-analytical';
            } else if(docTone.tone_name == 'Confident') {
                var className = 'tone-confident';
            } else if(docTone.tone_name == 'Tentative') {
                var className = 'tone-tentative';
            } else {
                var className = 'tone-unknown';
            }
            
            if(docTone.score >= 0 && docTone.score <= 0.4999) {
                var scoreClassName = 'score-low';
            } else if(docTone.score >= 0.5 && docTone.score <= 0.7499) {
                var scoreClassName = 'score-med';
            } else if(docTone.score >= 0.75 && docTone.score <= 1.0) {
                var scoreClassName = 'score-high';
            }
            docToneTableInnerHTML += 
                `<tr>
                    <td class="doctone-name"><ul class="list-unstyled"><li class="doc-tone-name ${className}">${docTone.tone_name}</li></ul></td>
                    <td class="doctone-score"><ul class="list-unstyled"><li class="doc-tone-score ${scoreClassName}">${(docTone.score*100).toFixed(2)}%</li></ul></td>
                </tr>`;
        });
        
        if(!(typeof(sentTones) == 'undefined')) {
            sentTones.forEach(function(sentTone) {
                
                var indTonesHTML = '<ul class="list-unstyled">';
                var indToneScoresHTML = '<ul class="list-unstyled">';
                
                sentTone.tones.forEach(function(indTone) {
                    if(indTone.tone_name == 'Anger') {
                        var className = 'tone-anger';
                    } else if(indTone.tone_name == 'Fear') {
                        var className = 'tone-fear';
                    } else if(indTone.tone_name == 'Joy') {
                        var className = 'tone-joy';
                    } else if(indTone.tone_name == 'Sadness') {
                        var className = 'tone-sadness';
                    } else if(indTone.tone_name == 'Analytical') {
                        var className = 'tone-analytical';
                    } else if(indTone.tone_name == 'Confident') {
                        var className = 'tone-confident';
                    } else if(indTone.tone_name == 'Tentative') {
                        var className = 'tone-tentative';
                    } else {
                        var className = 'tone-unknown';
                    }
                    
                    if(indTone.score >= 0 && indTone.score <= 0.4999) {
                        var scoreClassName = 'score-low';
                    } else if(indTone.score >= 0.5 && indTone.score <= 0.7499) {
                        var scoreClassName = 'score-med';
                    } else if(indTone.score >= 0.75 && indTone.score <= 1.0) {
                        var scoreClassName = 'score-high';
                    }
                    indTonesHTML += `<li class="sent-tone-name ${className}">${indTone.tone_name}</li>`;
                    indToneScoresHTML += `<li class="sent-tone-score ${scoreClassName}">${(indTone.score*100).toFixed(2)}%</li>`;
                });
                
                indTonesHTML += '</ul>';
                indToneScoresHTML += '</ul>';
                
                sentToneTableInnerHTML += 
                    `<tr>
                        <td class="senttone-id">${sentTone.sentence_id}</td>
                        <td class="senttone-text">${sentTone.text}</td>
                        <td class="sentence-name">${indTonesHTML}</td>
                        <td class="sentence-score">${indToneScoresHTML}</td>
                        <td class="senttone-count">${sentTone.tones.length}</td>
                    </tr>`;
            });
            var sentHeaderHTML = `<h2 class="tone-header">Sentence Tone:</h2>`;
            var sentHTML = `<table class="table"><tbody><tr><th>Sentence ID</th><th>Text</th><th>Tone Name</th><th>Score</th><th>Tone Count</th></tr>${sentToneTableInnerHTML}</tbody></table>`;
            $('#sent-header').html(sentHeaderHTML);
            $('#sent-results').html(sentHTML);
        }

        var docHeaderHTML = `<h2 class="tone-header">Document Tone:</h2>`;
        var docHTML = `<table class="table"><tbody><tr><th>Tone Name</th><th>Score</th></tr>${docToneTableInnerHTML}</tbody></table>`;
        
        $('#doc-results').html(docHTML);
        $('#doc-header').html(docHeaderHTML);
        $('.results').fadeIn();
    });
}