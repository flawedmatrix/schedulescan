var mysql = require('mysql');	

function mysql_real_escape_string (str) {
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\"":
            case "'":
            case "\\":
            case "%":
                return "\\"+char; // prepends a backslash to backslash, percent,
                                  // and double/single quotes
        }
    });
}

//adding data
exports.addtodb = function(datarows) {
	var connection = mysql.createConnection({
		  host     : 'localhost',
		  user     : 'hackathon',
		  password : 'password',
		  database : 'bclass',
	});
	//assume that the table is set up beforehand
	connection.connect();
	var datarow;
	var values;
	console.log('arr length is ', datarows.length);
	for(var i = 0; i < datarows.length; i++) {
		console.log('On row ', i);
		datarow = datarows[i];
		values = "('" + mysql_real_escape_string(datarow.dept) + "', '" + 
                    mysql_real_escape_string(datarow.title) + "', '" + 
                    mysql_real_escape_string(datarow.courseno) + "', '" + 
                    mysql_real_escape_string(datarow.sectionno) + "', '" + 
                    mysql_real_escape_string(datarow.controlno) + "', '" + 
                    mysql_real_escape_string(datarow.time) + "', '" + 
                    mysql_real_escape_string(datarow.room) + "', '" + 
                    mysql_real_escape_string(datarow.units) + "', '" + 
                    mysql_real_escape_string(datarow.instructor) +"', '" + 
                    mysql_real_escape_string(datarow.examgroup) + "', '" + 
                    mysql_real_escape_string(datarow.restrictions) + "', '" + 
                    mysql_real_escape_string(datarow.note) +"')";
		connection.query('INSERT INTO courses (dept, title, courseno, sectionno, controlno, time, room, units, instructor, examgroup, restrictions, note) VALUES ' + values, function(err, rows, fields) {
		  if (err) throw err;
		  console.log('Inserted course no: ', datarow.controlno);
		});
	}
	connection.end();
	console.log('connection closed');
};

//querying
exports.querydb = function(inputrow, callback) {
	var connection = mysql.createConnection({
		  host     : 'localhost',
		  user     : 'hackathon',
		  password : 'password',
		  database : 'bclass',
	});
	connection.connect();
	var values = '';
	if(type(inputrow.dept) != null && inputrow.dept != undefined) {
		values += ' dept = "'+inputrow.dept+'"';
	}
	if(type(inputrow.title) != null && inputrow.title != undefined) {
		if(values != '') {
			values += ' AND';
		}
		values += ' title = "'+inputrow.title+'"';
	}
	if(type(inputrow.dept) != null && inputrow.dept != undefined) {
		if(values != '') {
			values += ' AND';
		}
		values += ' courseno = "'+inputrow.dept+'"';
	}
	if(type(inputrow.sectionno) != null && inputrow.sectionno != undefined) {
		if(values != '') {
			values += ' AND';
		}
		values += ' sectionno = "'+inputrow.sectionno+'"';
	}
	if(type(inputrow.controlno) != null && inputrow.controlno != undefined) {
		if(values != '') {
			values += ' AND';
		}
		values += ' controlno = "'+inputrow.controlno+'"';
	}
	if(type(inputrow.time) != null && inputrow.time != undefined) {
		if(values != '') {
			values += ' AND';
		}
		values += ' time = "'+inputrow.time+'"';
	}
	if(type(inputrow.room) != null && inputrow.room != undefined) {
		if(values != '') {
			values += ' AND';
		}
		values += ' room = "'+inputrow.room+'"';
	}
	if(type(inputrow.units) != null && inputrow.units != undefined) {
		if(values != '') {
			values += ' AND';
		}
		values += ' units = "'+inputrow.units+'"';
	}
	if(type(inputrow.instructor) != null && inputrow.instructor != undefined) {
		if(values != '') {
			values += ' AND';
		}
		values += ' instructor = "'+inputrow.instructor+'"';
	}
	if(type(inputrow.examgroup) != null && inputrow.examgroup != undefined) {
		if(values != '') {
			values += ' AND';
		}
		values += ' examgroup = "'+inputrow.examgroup+'"';
	}
	if(type(inputrow.restrictions) != null && inputrow.restrictions != undefined) {
		if(values != '') {
			values += ' AND';
		}
		values += ' restrictions = "'+inputrow.restrictions+'"';
	}
	if(type(inputrow.note) != null && inputrow.note != undefined) {
		if(values != '') {
			values += ' AND';
		}
		values += ' note = "'+inputrow.note+'"';
	}
	values+=';';
	
	connection.query('SELECT * FROM courses WHERE'+values, function(err, rows, fields) {
		if (err) throw err;
		callback(rows);
	});
	
	connection.end();
};
