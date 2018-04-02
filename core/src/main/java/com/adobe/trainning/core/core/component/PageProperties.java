package com.adobe.trainning.core.core.component;

import java.util.ArrayList;
import java.util.List;

import javax.jcr.Node;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.sightly.WCMUsePojo;
import com.adobe.trainning.core.core.models.ChildPageModel;
import com.adobe.trainning.core.core.models.PagePropertiesModel;
import com.adobe.trainning.core.core.util.PageUtil;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.wcm.api.Page;


public class PageProperties extends WCMUsePojo
{
	private static final Logger LOGGER = LoggerFactory.getLogger(ActivitiesChildPage.class);
	
    private PagePropertiesModel pagePropertiesModel = new PagePropertiesModel();
    
    private List<ChildPageModel> pageList = new ArrayList<ChildPageModel>();
      
    @Override
    public void activate() throws Exception {
        
    	try {
    		List<Page> pages = PageUtil.getAllChildPages(getCurrentPage());
        	for(Page page : pages) {
        		ChildPageModel childPage = new ChildPageModel();
        		childPage.setName(page.getName());
        		childPage.setPath(page.getPath());
        		pageList.add(childPage);
        	}
        	
    		String pagePath = getProperties().get("childnode", "") ;
    		Node node = getRequest().getResourceResolver().getResource(pagePath + "/" + JcrConstants.JCR_CONTENT).adaptTo(Node.class);
    		pagePropertiesModel.setIcon(node.getProperty("iconCustome").getString());
    		pagePropertiesModel.setName(node.getProperty("nameCustome").getString());
    		pagePropertiesModel.setTitle(node.getProperty("titleCustome").getString());
    		pagePropertiesModel.setDescription(node.getProperty("descriptionCustome").getString());
    		pagePropertiesModel.setImage(node.getProperty("imageCustome").getString());
    		pagePropertiesModel.setPagePath(pagePath);
    		
		} catch (Exception e) {
			LOGGER.error(e.toString());
		}
    }
         
    public PagePropertiesModel getPagePropertiesModel() {
        return pagePropertiesModel;
    }
    
    public List<ChildPageModel> getPageList() {
        return pageList;
    }
}