function tabsModule(tabsItem, tabsParent, ContentInTabs, activeClass) {
  // Tabs
  const tabsArray = document.querySelectorAll(tabsItem),
    tabsArrayParent = document.querySelector(tabsParent),
    tabsContent = document.querySelectorAll(ContentInTabs);

  //Hide tabs
  function hide() {
    for (let i = 0; i < tabsContent.length; i++) {
      tabsContent[i].style.display = 'none';
      tabsArray[i].classList.remove(activeClass);
    }
  }
  //Активный таб(по умолчанию первый)
  function showActiveTab(i = 0) {
    tabsContent[i].style.display = 'block';
    tabsContent[i].classList.add('fade');
    tabsArray[i].classList.add(activeClass);
  }
  //смена активного таба по клику
  function tabChange() {
    tabsArrayParent.addEventListener('click', (event) => {
      if (event.target.classList.contains(tabsItem.slice(1))) {
        tabsArray.forEach((item, index) => {
          if (event.target == item) {
            hide();
            showActiveTab(index);
          }
        });
      }
    });
  }

  hide();
  showActiveTab();
  tabChange();
}

export default tabsModule;