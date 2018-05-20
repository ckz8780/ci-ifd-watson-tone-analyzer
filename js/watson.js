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
            docToneTableInnerHTML += 
                `<tr>
                    <td class="doctone-name">${docTone.tone_name}</td>
                    <td class="doctone-score">${docTone.score}</td>
                </tr>`;
        });
        
        if(!(typeof(sentTones) == 'undefined')) {
            sentTones.forEach(function(sentTone) {
                
                var indTonesHTML = '<ul class="list-unstyled">';
                var indToneScoresHTML = '<ul class="list-unstyled">';
                
                sentTone.tones.forEach(function(indTone) {
                    indTonesHTML += `<li class="text-success">${indTone.tone_name}</li>`;
                    indToneScoresHTML += `<li class="text-success">${indTone.score}</li>`;
                });
                
                indTonesHTML += '</ul>';
                indToneScoresHTML += '</ul>';
                
                sentToneTableInnerHTML += 
                    `<tr>
                        <td class="senttone-id">${sentTone.sentence_id}</td>
                        <td class="senttone-text">${sentTone.text}</td>
                        <td class="sentence-name">${indTonesHTML}</td>
                        <td class="sentence-name">${indToneScoresHTML}</td>
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