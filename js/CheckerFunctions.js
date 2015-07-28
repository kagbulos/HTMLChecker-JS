//tells you whether or not the line has an open tag
function hasOpenTag(line)
{
	if (line.indexOf("<") != -1 && line.indexOf(">") != -1)
	{
		return true;
	}
	else
		return false;
}

//tells you whether or not the line has closing tag
function hasCloseTag(line)
{
	if (line.indexOf("</") != -1 && line.indexOf(">") != -1)
	{
		return true;
	}
	else
		return false;
}

//tells you whether the line has an upper case or not
function hasUpperCase(line)
{
	var i, len, insideTag, insideQuote, insideComment;

	//go through each character in the line
	for (i = 0, len = line.length; i < len; i++) {
		if (line[i] == '<') {
			insideTag = true;
		}
		if (line[i] == '>') {
			insideTag = false;
		}

		if (i + 3 < line.length && line [i] == "<" && line [i+1] == "!" && line [i+2] == "-" && line [i+3] == "-") {
			insideComment = true;
		}
		if (i + 2 < line.length && line [i] == "-" && line [i+1] == "-" && line [i+2] == ">") {
			insideComment = false;
		}

		if (line[i] == '"') {
			insideQuote = !insideQuote;
		}

		code = line.charCodeAt(i);
		if ((code > 64 && code < 91) && insideTag && !insideQuote && !insideComment) { // upper alpha (A-Z) and not inside a quote and between tags
			return true;
		}
	}
	return false;
}

//checks if there is any empty space at the end of the string
function endsEmptySpace(input)
{
	if (input !== "" && input.length > 0 && input[input.length-1] == ' ')
	{
		return true;
	}
	else
		return false;
}

//finds how many spaces there are in the line
function findIndentation(input)
{
	var count = 0;

	if (input.length === 0)
	{
		return 0;
	}

	return input.split(/[^ \t\r\n]/)[0].length; //**returns the number of tabs as well as the number of spaces!!!
}

//tells you if you have tabs in the line
function hasTabs(input)
{
	return input.split(/[^\t]/)[0].length;
}

//tells you how many tabs there are in the line
function howManyTabs(input)
{
	return (input.match(/\t/g) || []).length;
}

//tells you if you use utf-8 encoding or not
function hasUTF8(input)
{
 return (input.indexOf('<meta charset="utf-8">') != -1 || input.indexOf('<meta charset="UTF-8">') != -1);
}

//tells you if you are looking at a line with html comment or not
function hasComment(input)
{
	return (input.indexOf("<!") != -1);
}

//tells you if you are using html5 or not
function hasHTML5(input)
{
	return (input.indexOf('<!DOCTYPE html>') != -1);
}

//tells you if you have a self closing tag or not
function hasSelfClosingTag(input)
{
	return (input.indexOf('<area />') != -1 || input.indexOf('<base />') != -1 || input.indexOf('<br />') != -1
			|| input.indexOf('<col />') != -1 || input.indexOf('<command />') != -1 || input.indexOf('<embed />') != -1
			|| input.indexOf('<hr />') != -1 || input.indexOf('<img />') != -1 || input.indexOf('<input />') != -1
			|| input.indexOf('<keygen />') != -1 || input.indexOf('<link />') != -1 || input.indexOf('<meta />') != -1
			|| input.indexOf('<param />') != -1 || input.indexOf('<source />') != -1 || input.indexOf('<track />') != -1
			|| input.indexOf('<wbr />') != -1);
}

//tells you if you have a body tag or not
function hasBody(input)
{
	return (input.indexOf('<body>') != -1 || input.indexOf('<Body>') != -1 || input.indexOf('<BODY>') != -1);
}

//tells you if you have a head tag or not
function hasHead(input)
{
	return (input.indexOf('<head>') != -1 || input.indexOf('<Head>') != -1 || input.indexOf('<HEAD>') != -1);
}

//tells you if you have a htmltag or not
function hasHtml(input)
{
	return (input.indexOf('<html') != -1 || input.indexOf('<Html') != -1 || input.indexOf('<HTML') != -1);
}

//tells you if you have an img tag but no alt for it
function hasImg(input)
{
	return (input.indexOf('<img') != -1 || input.indexOf('<Img>') != -1 || input.indexOf('<IMG') != -1);
}

//tells you if their is an alt attribute in the line
function hasAlt(input)
{
	return (input.indexOf('alt=') != -1 || input.indexOf('alt =') != -1);
}

//tells you there is a script tag
function hasScript(input)
{
	return (input.indexOf('<script') != -1 || input.indexOf('<Script>') != -1 || input.indexOf('<SCRIPT') != -1);
}

//tells you if there is a link to the script or if this is actual js to follow
function haSrc(input)
{
	return (input.indexOf('src=') != -1 || input.indexOf('src =') != -1);
}

//tells you if there is a style tag on the line
function hasStyle(input)
{
	return (input.indexOf('<style') != -1 || input.indexOf('<Style') != -1 || input.indexOf('<STYLE') != -1);
}

//tells you if you have an entity reference or not in the line
function hasEntityReference(input)
{
	var andLocation = input.indexOf('&');
	var code;
	if (andLocation != -1 && andLocation + 1 < input.length) //if you found a & and the next thing that follows is an alpha
	{
		code = input.charCodeAt(andLocation + 1);
		if ((code > 64 && code < 91) || // upper alpha (A-Z)
        	(code > 96 && code < 123)) // lower alpha (a-z)
		{
			return true;
		}

		return false;
	}
}

//tells you if you have a type attribute or not
function hasType(input)
{
	return (input.indexOf('type=') != -1 || input.indexOf('type =') != -1);
}

//tells you if you have a link tag or not
function hasLink(input)
{
	return (input.indexOf('<link') != -1 || input.indexOf('<Link =') != -1 || input.indexOf('<LINK') != -1);
}

//tells you if you have a open block quote and close block quote on the same line
function hasBlockQuote(input)
{
	return (input.indexOf('<blockquote>') != -1 && input.indexOf('</blockquote>') != -1);
}

//tells you if you have a open list and close list on the same line
function hasList(input)
{
	return (input.indexOf('<ul>') != -1 && input.indexOf('</ul>') != -1);
}

//tells you if you have a open table and close table on the same line
function hasTable(input)
{
	return (input.indexOf('<table>') != -1 && input.indexOf('</table>') != -1);
}

//tells you if you have multiple list or table elements on the same line
function multipleBlockListTable(input)
{
	var li = input.indexOf('<li>');
	var thead = input.indexOf('<thead>');
	var tr = input.indexOf('<tr>');
	var th = input.indexOf('<th>');
	var tbody = input.indexOf('<tbody>');
	var td = input.indexOf('<td>');
	if (
		(li != -1  && input.indexOf('<li>') != input.lastIndexOf('<li>')) ||
		(thead != -1  && input.indexOf('<thead>') != input.lastIndexOf('<thead>')) ||
		(tr != -1  && input.indexOf('<tr>') != input.lastIndexOf('<tr>')) ||
		(th != -1  && input.indexOf('<th>') != input.lastIndexOf('<th>')) ||
		(tbody != -1  && input.indexOf('<tbody>') != input.lastIndexOf('<tbody>')) ||
		(td != -1  && input.indexOf('<td>') != input.lastIndexOf('<td>')))
	{
		return true;
	}
}

//tells you if you found a case with single quotes
function hasSingleQuotes(input)
{
	return input.indexOf('\'') != -1;
}

//tells you if you have found a case with an empty line
function emptyLine(input)
{
	return input.length == 0;
}

