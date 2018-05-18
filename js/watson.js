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
            console.log(docTone);
            docToneTableInnerHTML += `
                                    <tr>
                                        <td class="doctone-name">${docTone.tone_name}</td>
                                        <td class="doctone-score">${docTone.score}</td>
                                    </tr>`;
        });
        
        sentTones.forEach(function(sentTone) {
            
            console.log(sentTone);
            var sentId = sentTone.sentence_id;
            var sentText = sentTone.text;
            var sentTones = sentTone.tones.length;
            
            console.log('Sentence ' + sentId + ': ' + sentText + ' (' + sentTones + ' different tones detected)');
            
            sentToneTableInnerHTML += 
                `<tr>
                    <td class="senttone-id">${sentTone.sentence_id}</td>
                    <td class="senttone-text">${sentTone.text}</td>
                    <td class="senttone-count">${sentTone.tones.length}</td>
                </tr>`;
            
        });
        
        var docHTML = `<h2 class="tone-header">Document Tone:</h2><table class="table table-bordered table-sm table-hover"><tbody><tr><th>Tone Name</th><th>Score</th></tr>${docToneTableInnerHTML}</tbody></table>`;
        var sentHTML = `<h2 class="tone-header">Sentence Tone:</h2><table class="table table-bordered table-sm table-hover"><tbody><tr><th>Sentence ID</th><th>Text</th><th>Tones Detected</th></tr>${sentToneTableInnerHTML}</tbody></table>`;
        
        $('#doc-results').html(docHTML);
        $('#sent-results').html(sentHTML);
        
    });
}