const submit_button = document.querySelector('#submit_btn_div');
const definition_text = document.querySelector('#results_text');
var added = false;


// submit button clicked
submit_button.addEventListener('click', function(){
  var input_text = document.querySelector('#input').value;
  if(input_text != "")
  {
    added = false;
    GetResponse(input_text)
  }
})

var responseObj = null;

// api handler
function GetResponse(input_text) {
  const Http = new XMLHttpRequest();
  const link = `https://api.urbandictionary.com/v0/define?term=${input_text}`;
  Http.open("GET", link);
  Http.send();
  try {
    Http.onreadystatechange = (e) => {
      if (Http.status == 200) {
        var response = Http.responseText;
        console.log(response);
        try {
          responseObj = JSON.parse(response);

        }
        catch {

        }
        if (!added) {
          document.querySelector('#main_div').innerHTML = "<div id=\"title_div\"><h2 style=\"text-align: center; margin: 0px 0px 20px 0px;\">Enter a word or phrase to learn it's Urban Dictionary Definition</h2></div><div id=\"input_submit_div\"><input id=\"input\" type=\"text\" placeholder=\"Enter a word or phrase\"><div id=\"submit_btn_div\"><h6 style=\"margin: 0px;\">submit</h6></div></div>";
          AddDefinitionToUI(responseObj);
        }
      }
    }
  }
  catch {

  }
}

function AddDefinitionToUI(responseObj){
  for(var i = 0; i < responseObj.list.length; i++){
    // parent = main_div
    // <div id="result_text_div">
    //      <h3 id="results_text" style="text-align: center; margin: 10px;">No results</h3>
    // </div>

    var individualDefinitionResponse = responseObj.list[i];

    var newResultsTextDiv =  document.createElement('div');
    newResultsTextDiv.id = "result_text_div";
    document.querySelector('#main_div').appendChild(newResultsTextDiv);

    var newTextDefinition = document.createElement('h3');
    newTextDefinition.id = "results_text";
    newTextDefinition.style = 'text-align: center; margin: 10px;';
    newResultsTextDiv.appendChild(newTextDefinition)

    const string = individualDefinitionResponse.definition + '\n\n' + individualDefinitionResponse.example;
    newTextDefinition.innerHTML = string;
  };
  added = true;
}