function isProEEmbeddedBrowser() {
    return top.external && top.external.ptc ? !0 : !1
}

function pfcIsMozilla() {
    return pfcIsWindows() || pfcIsChrome() ? !1 : !0
}

function pfcIsChrome() {
    return -1 < navigator.userAgent.toString().toLowerCase().indexOf("chrome/") ? !0 : !1
}

function pfcIsWindows() {
    return -1 != navigator.userAgent.toString().toLowerCase().indexOf("trident") ? !0 : !1
}

function pfcCreate(a) {
    if (pfcIsWindows()) return new ActiveXObject("pfc." + a);
    if (pfcIsChrome()) return pfcCefCreate(a);
    if (pfcIsMozilla()) return netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect"), ret = Components.classes["@ptc.com/pfc/" + a + ";1"].createInstance()
}

function pfcGetProESession() {
    if (!isProEEmbeddedBrowser()) throw Error("Not in embedded browser.  Aborting...");
    pfcIsMozilla() && netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
    return pfcCreate("MpfcCOMGlobal").GetProESession()
}

function pfcGetScript() {
    if (!isProEEmbeddedBrowser()) throw Error("Not in embedded browser.  Aborting...");
    pfcIsMozilla() && netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
    return pfcCreate("MpfcCOMGlobal").GetScript()
}

function pfcGetExceptionDescription(a) {
    pfcIsWindows() ? errString = a.description : pfcIsChrome() ? errString = window.pfcCefGetLastException().message : pfcIsMozilla() && (errString = a.message);
    return errString
}

function pfcGetExceptionType(a) {
    errString = pfcGetExceptionDescription(a);
    return 0 > errString.search("XPCR_C") ? (errString = errString.replace("Exceptions::", ""), semicolonIndex = errString.search(";"), 0 < semicolonIndex && (errString = errString.substring(0, semicolonIndex)), errString) : errString.replace("XPCR_C", "")
}

function RetrieveModelByFile(a, b) {
    var c = pfcCreate("pfcModelDescriptor").CreateFromFileName(a);
    c.Path = b;
    var d = pfcCreate("pfcRetrieveModelOptions").Create();
    return session.RetrieveModelWithOpts(c, d)
}

function UpdateWindow() {
    "yes" == session.GetConfigOption("display_annotations") ? (session.RunMacro("~ Command `ProCmdEnvAnnotElemDisp`  0"), session.RunMacro("~ Command `ProCmdEnvAnnotElemDisp`  1")) : (session.RunMacro("~ Command `ProCmdEnvAnnotElemDisp`  1"), session.RunMacro("~ Command `ProCmdEnvAnnotElemDisp`  0"));
    session.CurrentWindow.Repaint()
}

function createDocument() {
    if ("string" != typeof arguments.callee.activeXString)
        for (var a = ["MSXML2.DOMDocument.6.0", "MSXML2.DOMDocument.3.0", "MSXML2.DOMDocument"], b = 0, c = a.length; b < c; b++) try {
            var d = new ActiveXObject(a[b]);
            arguments.callee.activeXString = a[b];
            return d
        } catch (e) {}
    return new ActiveXObject(arguments.callee.activeString)
}

function getChildNodeValue(a, b) {
    return 0 == a.getElementsByTagName(b).length ? "" : a.getElementsByTagName(b)[0].childNodes[0].nodeValue
}

function canStartParseXML(a) {
    if (4 == a.readyState && 0 == a.parseError) return !0;
    if (4 != a.parseError) return !1;
    alert("An error occurred:\n Error Code:" + xmldom.parseError.errorCode + "\nLine:" + xmldom.parseError.line + "\nLine Pos:" + xmldom.parseError.linepos + "\nReason:" + xmldom.parseError.reason);
    return !1
}

function GetLinkUrl() {
    var a = "";
    return a = "undefined" === typeof this.href ? document.location.toString() : this.href.toString()
}

function GetBaseURL(a) {
    return a.split("?")[0].replace(/[/][^/]+\.html?.*/i, "") + "/"
}

function GetLocalDirectory(a) {
    a = a.split("?")[0].replace("file:///", "");
    return a = a.replace(/[\\/][^\\/]+\.html?.*/i, "")
}

function GetRequest(a) {
    var b = {};
    a = a.split("?");
    if (2 > a.length) return b;
    a = a[1];
    if (-1 != a.indexOf("&"))
        for (strs = a.split("&"), a = 0; a < strs.length; a++) b[strs[a].split("=")[0]] = unescape(strs[a].split("=")[1]);
    else b[a.split("=")[0]] = unescape(a.split("=")[1]);
    return b
}

function MakeParamInput(a) {
    var b = '<div class="div_item"><div class="input_title">' + getChildNodeValue(a, "Title") + ":</div>",
        c = getChildNodeValue(a, "Options");
    if ("" != c) {
        for (var c = c.split(","), b = b + '<div style="position:relative;float:left;"><span style="margin-left:72px;width:18px;overflow:hidden;"> <select style="width:90px;margin-left:-70px" onchange="this.parentNode.nextSibling.value=this.value">  ', d = 0, e = c.length; d < e; d++) b += '<option value="' + c[d] + '" >' + c[d] + "</option>";
        b += '</select></span><input type="text" style="width:70px;position:absolute;left:0px;" id="' + getChildNodeValue(a, "Name") + '" value="' + getChildNodeValue(a, "DefaultValue") + '" /></div> '
    } else b += '<input class="input_item" type="textundefined" id="' + getChildNodeValue(a, "Name") + '" value="' + getChildNodeValue(a, "DefaultValue") + '" />';
    return b += "</div>"
};