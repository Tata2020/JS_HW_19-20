 $(function() {
    	
	  var obj = {};
    $.getJSON ('https://raw.githubusercontent.com/goit-fe/markup_fe2o/master/js_19-20/data.json', function(data) {
    obj = data;
  
       var j = 0; 
       var elPrint = '';
       var elPrint1 = '';
       var skills = [];
       var nameFriends = [];
       var skillsUnion = [];
       var friendsUnion = [];
       var nameObject = {};
       function Person(name, numFriends) {
          this.name = name;
          this.numFriends = numFriends;
      };
       
           
  // 1. Массив скиллов (поле skills) всех людей,
  // не должно быть повторяющихся скиллов, должны быть отсортированы по алфавиту;
    for (var i = 0; i < obj.length; i++) {
         var name = obj[i].name;
         var numFriends = obj[i].friends.length;
         nameObject[i] = new Person (name, numFriends);
         
         skills [j] = obj[i].skills;
        
         var p = obj[i].friends;
            for (var n = 0; n < p.length; n++) {
                nameFriends [n] = p [n].name;
                if ( n === 0 && j ===0 ) {
                  friendsUnion = nameFriends [n];
                } else {
                    friendsUnion = _.concat(friendsUnion, nameFriends [n]); //concat new names
                  };
            };

        if (j === 0 ) {
            skillsUnion = skills[j];
            } else {
              skillsUnion = _.union(skillsUnion, skills[j]); //concat new skills
             };
        j++;
      };
      skillsUnion = _.sortBy(skillsUnion); //sort skills
      
      for (var i = 0; i < skillsUnion.length; i++) {
        elPrint = skillsUnion[i];
        $('.skills__array').append("<li class='skills__item'>" + elPrint + "</li>");
      };
      var elHeight = $('.skills').innerHeight();
      
   // 2. Массив имен (поле name) людей, 
   //отсортированных в зависимости от количества их друзей (friends); 

       nameObject = _.sortBy(nameObject, ['name']); //alphabet sorting 
       nameObject = _.sortBy(nameObject, ['numFriends']); // friends sorting
      for (var i = 0; i < nameObject.length; i++) {
        elPrint = nameObject[i].name;
        elPrint1 = nameObject[i].numFriends;
        $('.names__array').append("<li class='names__item'>" + elPrint + " - (" + elPrint1 + ")</li>");

      };
       $('.names').height(elHeight);
   // 3. Массив всех друзей всех пользователей, не должно быть повторяющихся людей
  
      friendsUnion =_.uniqWith(friendsUnion, _.isEqual); // deleting repeated name
      //console.log('friendsUnion', friendsUnion);
      for (var i = 0; i < friendsUnion.length; i++) {
        elPrint = friendsUnion[i];
        $('.friends__array').append("<li class='friends__item'>" + elPrint + "</li>");
      };
      $('.friends').height(elHeight);
    });
 });