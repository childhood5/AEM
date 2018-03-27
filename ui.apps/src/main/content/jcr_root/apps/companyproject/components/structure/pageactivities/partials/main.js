use(function () {
    var title = currentPage.getTitle();
   //To get the title of the current page
    var level = currentPage.getDepth();
   //To find the depth of the current page from the root
    var cts = new Array();
    // To store the traversed page (object) from the root
     for(var i=1;i<level;i++)
    {  // Here I used i=1 for mycase(i=0 will be /content)
        var titl = currentPage.getAbsoluteParent(i);
        //To get the absolute parent at each level from root
        pageStack.push(titl);
      //Stack to maintain the pages
    }
    return {
        title: title,
        pageStack:pageStack

    };
});