(function(){
    var query = {};
    var btnClass = '.dnl-btn';
    var chbClass = '.el-param';
    var multiChbClass = '.multi-el-param';

    /**
     *  РџСЂРё РїРµСЂРІРѕРј Р·Р°РїСѓСЃРєРµ РїР°СЂСЃРёС‚ href РєРЅРѕРїРєРё РІ СЃР»РѕРІР°СЂСЊ query
     *  @return {void}
     */
    function buildQuery() {
        var btn, rawQuery;
        
        if (btn = document.querySelector(btnClass)) {
            rawQuery = btn.href.split('?')[1].split('&');
            for (var i = 0; i < rawQuery.length; ++i) {
                rawQuery[i] = rawQuery[i].split('=');
                setQuery(rawQuery[i][0], rawQuery[i][1], true);
            }
        }
    }
    /**
     *  Р”РѕР±Р°РІР»СЏРµС‚ РІ query РЅРѕРІС‹Р№ СЌР»РµРјРµРЅС‚ 
     *  @param {string} key
     *  @param {string|number} value
     *  @param {boolean} [withoutRedraw=false] - РЅСѓР¶РЅР° РїРµСЂРµСЂРёСЃРѕРІРєР° href Сѓ РєРЅРѕРїРѕРє РёР»Рё РЅРµС‚
     *  @return {void}
     */
    function setQuery(key, value, withoutRedraw) {
        query[key] = value;
        if (!withoutRedraw) {
            redrawHref();
        }
    }
    /**
     *  РћР±С…РѕРґРёС‚ С‡РµРєР±РѕРєСЃС‹, РґРѕР±Р°РІР»СЏРµС‚ РёС… РІ query, СЃС‚Р°РІРёС‚ РѕР±СЂР°Р±РѕС‚С‡РёРєРё РЅР°Р¶Р°С‚РёСЏ
     *  @return {void}
     */
    function startListeners() {
        var checkboxes, multiCheckboxes, btns, overlay;
        
        if (checkboxes = document.querySelectorAll(chbClass)) {
            for (var i = 0; i < checkboxes.length; ++i) {
                setQuery(checkboxes[i].id, Number(checkboxes[i].checked));
                addListener(checkboxes[i], 'change', changeElParam);
            }
        }
        
        if (multiCheckboxes = document.querySelectorAll(multiChbClass)) {
            for (var i = 0; i < multiCheckboxes.length; ++i) {
                setQuery(multiCheckboxes[i].id, Number(checkboxes[i].checked));
                addListener(multiCheckboxes[i], 'change', function() {});
            }
        }
        
        if (btns = document.querySelectorAll(btnClass)) {
            for (var i = 0; i < btns.length; ++i) {
                addListener(btns[i], 'click', dnl);
            }
        }
        
        if (overlay = document.querySelector('.overlay-wrapper')) {
            addListener(overlay, 'click', undln);
        }
    }
    /**
     *  РћР±СЂР°Р±РѕС‚С‡РёРє РєР»РёРєР° РїРѕ С‡РµРєР±РѕРєСЃСѓ
     *  @param {Event} ev
     *  @return {void}
     */
    function changeElParam(ev) {
        setQuery(ev.target.id, Number(ev.target.checked));
    }
    /**
     *  РџРµСЂРµСЂРёСЃРѕРІС‹РІР°РµС‚ href Сѓ РєРЅРѕРїРѕРє
     *  @return {void}
     */
    function redrawHref() {
        var href = [];
        var btns;
        for (var key in query) {
            href.push(key +'='+ query[key]);
        }
        href = href.join('&');
        
        if (btns = document.querySelectorAll(btnClass)) {
            for (var i = 0; i < btns.length; ++i) {
                btns[i].href = btns[i].href.split('?')[0] + '?' + href;
            }
        }
    }
    function dnl(ev) {
        if (checkLicense()) {
            alert('Р§С‚РѕР±С‹ СЃРєР°С‡Р°С‚СЊ Elements Browser РІС‹ РґРѕР»Р¶РЅС‹ РїСЂРёРЅСЏС‚СЊ СѓСЃР»РѕРІРёСЏ Р»РёС†РµРЅР·РёРѕРЅРЅРѕРіРѕ СЃРѕРіР»Р°С€РµРЅРёСЏ.');
            ev.preventDefault();
            return false;
        }
        
        setTimeout(function() {
            document.body.className += ' overlay';
        }, 300);
    }
    function undln() {
        document.body.className += ' hiding';
        setTimeout(function() {
            document.body.className = document.body.className.slice(0, document.body.className.indexOf('overlay') - 1);
        }, 300);
    }
    function setBodyClass() {
        window.onload = function() {
            document.body.className = (
                /yabrowser|firefox|OPR\//i.test(window.navigator.userAgent) 
                    ? 'up' 
                    : (
                        isIEOrEdge()
                            ? 'down center'
                            : 'down'
                    )
            );
        }
    }
    
    function isIEOrEdge() {
        var ua = window.navigator.userAgent;

        if (ua.indexOf('MSIE ') > 0) {
            return true;
        }

        if (ua.indexOf('Trident/') > 0) {
            return true;
        }

        if (ua.indexOf('Edge/') > 0) {
            return true;
        }
        
        return false;
    }
    
    function checkLicense() {
        if (document.getElementById('check_license')) {
            return !document.getElementById('check_license').checked;
        }
        
        return false;
    }
    
    function addListener(elem, eventType, func) {
        if (window.addEventListener) {
            elem.addEventListener(eventType, func);
        } else if (window.attachEvent) {
            elem.attachEvent('on' + eventType, func);
        }
    }

    /**
     *  Р—Р°РїСѓСЃРєР°РµС‚ СЃРєСЂРёРїС‚ РїРѕСЃР»Рµ Р·Р°РіСЂСѓР·РєРё СЃС‚СЂР°С‚РёС†С‹
     *  @return {void}
     */
    var init = function(){
        buildQuery();
        startListeners();
        setBodyClass();
    };

    init();
})();
