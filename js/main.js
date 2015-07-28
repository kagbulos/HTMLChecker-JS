var fileInput = document.getElementById('fileInput');
var fileDisplayArea = document.getElementById('fileDisplayArea');
var linesArray=new Array(); //will hold all of our lines
var lineToPrint = ""; //line from the code with a number at the front and errors at the end. i.e. 01 LINE-HERE ERROR-HERE
var resultTxt = ""; //will hold all the errors and be appended to the results id section
var errorTxt = ""; //will hold the error found
var lineNumber = 1; //tells the line number so we can print the line of the error
var indentationProcessed = false; //tells you if you have found your first line with tabs/spaces
var spacesFound = 0; //tells you the number of spaces you found in the first line with spaces/tabs
var keepProcessingIndents = false; //will tell you if you should keep looking at indentation or not
var currSpaces = 0; //the number of spaces on the current line
var utf8Present = false; //tells you if you have utf8 encoding
var html5Present = false; //tells you if you are usinbg html5
var bodyPresent = false; //tells you if you have a body tag
var headPresent = false; //tells you if you have a head tag
var htmlPresent = false; //tells you if you have a html tag

window.onload = function() {
	//called whenever the user chooses a file to upload (checks to make sure that it is a css file)
	fileInput.addEventListener('change', function(e) {
		var file = fileInput.files[0];
		var textType = /html.*/;

		if (file.type.match(textType)) {
			var reader = new FileReader();

			reader.onload = function(e) {
				fileDisplayArea.innerText = reader.result;
				//split the lines based on the new line char and store them inside our array
				var arrLines = fileDisplayArea.innerText.split("\n");
				arrLines.forEach(function (line) {
					linesArray.push(line);
			  	});
			  	//clear the display area
			  	fileDisplayArea.innerText = "";
			  	//send each line through CSSChecker in order to be processed
			  	linesArray.forEach(function(line){
			  		HTMLChecker(line);
			  	});

			  	//now that we are done processing the array, clear the contents for the next file to be read
			  	linesArray = [];
			};
			//actually read the text file for processing
			reader.readAsText(file);
		}
		else {
			fileDisplayArea.innerText = "File not supported!";
		}
	});
};

function HTMLChecker(line) {
	if (hasUpperCase(line) && !hasHTML5(line)) //no line should have an upper case in the tag area except strings and the initial <!DOCTYPE html>
	{
		errorTxt = "|| Has an Upper Case and should be lower case";
        lineToPrint += " " + errorTxt;
	}

	if (endsEmptySpace(line)) //no line should ever end with white space
	{
		errorTxt = "|| Ends in white space";
        lineToPrint += " " + errorTxt;
	}

	if (hasTabs(line) > 0 && howManyTabs(line) != findIndentation(line)) //line has tabs and spaces in the same line
	{
		errorTxt = "|| Has tabs and white spaces in the same line";
        lineToPrint += " " + errorTxt;
	}

	if (findIndentation(line) !== 0 && indentationProcessed === false) //we have come across our first line with indentation and need to save the info
	{
		spacesFound = findIndentation(line);
		indentationProcessed = true;
	}

	if (indentationProcessed) //if found indentation already, check to make sure it is consistent
	{
		currSpaces = findIndentation(line);
		if (Math.abs(currSpaces - spacesFound) > 1) {
			errorTxt = "|| Incorrect indenting begins on this line. Fix here and try again :)";
        	lineToPrint += " " + errorTxt;
        	indentationProcessed = false; //dont need to process indentation anymore
		}
		else
			spacesFound = currSpaces;
	}

	if (hasUTF8(line)) //checks that we have utf8 encoding
	{
		utf8Present = true;
	}

	if (lineNumber == linesArray.length && !utf8Present)  //case where you reach the end and dont have a utf8 tag
	{
		errorTxt = '|| Missing utf8 encoding. should have a tag that reads "<meta charset="utf-8">"';
        lineToPrint += " " + errorTxt;
	}

	if (hasSelfClosingTag(line)) //case where you found a self closing tag
	{
		errorTxt = '|| Found a self closing tag. Self closing elements should not be closed';
        lineToPrint += " " + errorTxt;
	}

	if (hasImg(line) && !hasAlt(line)) //case where we found an image tag without an alt attribute
	{
		errorTxt = '|| Line with an img tag but is missing a fallback option (alt attribute)';
        lineToPrint += " " + errorTxt;
	}

	if (hasScript(line) && !haSrc(line)) //case where they have script stuff inside their html
	{
		errorTxt = '|| Has javascript inside the html. need to remove this section and move it into a .js file';
        lineToPrint += " " + errorTxt;
	}

	if (hasStyle(line)) //case where they have style stuff inside their html
	{
		errorTxt = '|| Has css inside the html. need to remove this section and move it into a .css file';
        lineToPrint += " " + errorTxt;
	}

	if (hasEntityReference(line)) //case where they have entity reference in a line
	{
		errorTxt = '|| Has entity reference in a line when there is no need to use entity reference';
        lineToPrint += " " + errorTxt;
	}

	if (hasType(line) && (hasLink(line) || haSrc(line))) //case where you have a link or src tag with a type attribute
	{
		errorTxt = '|| Do not need type attribute for style sheets and scripts';
        lineToPrint += " " + errorTxt;
	}

	if (hasBlockQuote(line) || hasList(line) || hasTable(line)) //case where you have block, table or list open and close on the same line
	{
		errorTxt = '|| Use a new line for every block, list or table element and indent every such child element.';
        lineToPrint += " " + errorTxt;
	}

	if (multipleBlockListTable(line)) //case where have multiple table /list items on the same line
	{
		errorTxt = '|| Independent of the styling of an element (as CSS allows elements to assume a different role per display property), put every block, list or table element on a new line.';
        lineToPrint += " " + errorTxt;
	}

	if (hasSingleQuotes(line)) //case where you have found a ' and should be a "
	{
		errorTxt = '|| A single quote was found. Double quotes should be used';
        lineToPrint += " " + errorTxt;
	}

	if (emptyLine(line)) //case where you have an empty line
	{
		errorTxt = '|| There should be no empty lines in an html';
        lineToPrint += " " + errorTxt;
	}

	if (lineNumber < 10) //now that we have a line with all the info appened, append it to the filedisplayarea
	{
		tempLineNumber = "0" + lineNumber;
		$("#fileDisplayArea").append("<xmp>" + tempLineNumber + " " + line + " " + lineToPrint + "</xmp>");
	}
	else
	{
		$("#fileDisplayArea").append("<xmp>" + lineNumber + " " + line + " " + lineToPrint + "</xmp>");
	}

	if (hasHTML5(line)) //checks that we have utf8 encoding
	{
		html5Present = true;
	}

	if (lineNumber == linesArray.length && !html5Present)  //case where you reach the end and dont have a html5 tag
	{
        $("#fileDisplayArea").append('<xmp>  Missing html5 encoding. should have a tag that reads "<!DOCTYPE html>"</xmp>');
	}

	if (hasBody(line)) //checks that we have body tag
	{
		bodyPresent = true;
	}

	if (lineNumber == linesArray.length && !bodyPresent)  //case where you reach the end and dont have a body
	{
		$("#fileDisplayArea").append('<xmp>  Missing body tag. should have a tag that reads "<body>" </xmp>');
	}

	if (hasHead(line)) //checks that we have head tag
	{
		headPresent = true;
	}

	if (lineNumber == linesArray.length && !headPresent)  //case where you reach the end and dont have a head
	{
		$("#fileDisplayArea").append('<xmp>  Missing head tag. should have a tag that reads "<head>" </xmp>');
	}

	if (hasHtml(line)) //checks that we have html tag
	{
		htmlPresent = true;
	}

	if (lineNumber == linesArray.length && !htmlPresent)  //case where you reach the end and dont have a html
	{
		$("#fileDisplayArea").append('<xmp>  Missing html tag. should have a tag that reads "<html>" </xmp>');
	}

	lineNumber++; //increase line number
	lineToPrint = ""; //reset line to print for the next line of errors
}

function clearDisplayArea() {
	$( "#fileDisplayArea" ).empty();
	$( ".results" ).empty();
	lineNumber = 1; //reset the numbers so when the next file is picked the numbers reset
}