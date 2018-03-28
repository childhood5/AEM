package com.adobe.trainning.core.core.component;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.ResourceBundle;

import javax.jcr.Node;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.sightly.WCMUsePojo;
import com.adobe.trainning.core.core.models.ChildPageModel;
import com.adobe.trainning.core.core.models.HeroTextBean;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.i18n.I18n;
import com.day.cq.wcm.api.Page;


public class HeroTextComponent extends WCMUsePojo
{
	/** Default log. */
    protected final Logger log = LoggerFactory.getLogger(this.getClass());
    
     /** The hero text bean. */
    private HeroTextBean heroTextBean = new HeroTextBean();
    
    private List<ChildPageModel> pageList = new ArrayList<ChildPageModel>();
      
    
    @Override
    public void activate() throws Exception {
          
    	List<Page> pages = TouchMultiComponent.getAllChildPages(getCurrentPage());
    	for(Page element : pages) {
    		ChildPageModel childPage = new ChildPageModel();
    		childPage.setName(element.getName());
    		childPage.setPath(element.getPath());
    		pageList.add(childPage);
    	}
    	
    	final Locale pageLocale = getCurrentPage().getLanguage(false); 
		final ResourceBundle resourceBundle = getRequest().getResourceBundle(pageLocale); 
		I18n i18n = new I18n(resourceBundle);
		ChildPageModel childPage = new ChildPageModel();
		childPage.setName(i18n.get("hello"));
		pageList.add(childPage);
		
    	
		String pagePath = getProperties().get("childnode", "") ;
		Node node = getRequest().getResourceResolver().getResource(pagePath + "/" + JcrConstants.JCR_CONTENT).adaptTo(Node.class);
		
		String icon = node.getProperty("iconCustome").getString();
		String name = node.getProperty("nameCustome").getString();
		String title = node.getProperty("titleCustome").getString();
		String description = node.getProperty("descriptionCustome").getString();
		String image = node.getProperty("imageCustome").getString();
		
		heroTextBean.setIcon(icon);
		heroTextBean.setName(name);
		heroTextBean.setTitle(title);
		heroTextBean.setDescription(description);
		heroTextBean.setImage(image);
		heroTextBean.setPagePath(pagePath);
		
		
		
		
    }
    
         
    public HeroTextBean getHeroTextBean() {
        return this.heroTextBean;
    }
    
    public List<ChildPageModel> getPageList() {
        return pageList;
    }
}