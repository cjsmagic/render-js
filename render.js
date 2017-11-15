var render = (function(window, document, undefined) {

    var public = {

        component: component,
        init: searchForComponents

    };


    return public;

    /////////////////////////////////
    /*private variables declared here*/

    var componentList = [];


    function searchForComponents() {

        console.log(document.querySelectorAll('[rn-component]'));
        componentList = document.querySelectorAll('[rn-component]');


    }

    function component(selector, componentFunction) {

        var currentComponentDOM = findAndReturnComponent(selector);
        console.log('component initialized', currentComponentDOM.attributes);

        var currentComponentFunction = new componentFunction();
        console.log('component function', currentComponentFunction);

        var componentFragment = document.createDocumentFragment();
        componentFragment.innerHTML = document.querySelectorAll("[rn-component='" + selector + "']")[0].innerHTML;
        var str = componentFragment.innerHTML;


        for (var variables in currentComponentFunction) {

            var myReg = new RegExp('{{' + variables + '}}','g');
            var res = str.replace(myReg, currentComponentFunction[variables]); //'/{{'+currentComponentFunction[item]+'}}/g'

            componentFragment.innerHTML = res;
            str = res;
        }

        document.querySelectorAll("[rn-component='" + selector + "']")[0].innerHTML = componentFragment.innerHTML;
    }



    function findAndReturnComponent(selector) {

        
        var objectToReturn;
        componentList.forEach(function(object) {
           
            if (object.attributes[0].nodeValue == selector) {
                console.log('childObject.name');
                objectToReturn = object;
            }


        });

        return objectToReturn;

    }





})(window, document);
