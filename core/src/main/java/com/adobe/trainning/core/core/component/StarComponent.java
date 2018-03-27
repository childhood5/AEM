package com.adobe.trainning.core.core.component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.jcr.Node;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;

import com.adobe.cq.sightly.WCMUsePojo;
import com.adobe.trainning.core.core.models.BreadcrumbModel;
import com.adobe.trainning.core.core.models.Star;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.dam.api.Asset;
import com.day.cq.dam.commons.util.AssetReferenceSearch;

public class StarComponent extends WCMUsePojo {

	private List<Star> stars = new ArrayList<Star>();
	
	@Override
	public void activate() throws Exception {
		
//		String pagePath = getRequest().getParameter("path");  
//        ResourceResolver resourceResolver=getRequest().getResourceResolver();  
//        Resource resource = resourceResolver.getResource(pagePath+"/"+JcrConstants.JCR_CONTENT);  
//        Node node = resource.adaptTo(Node.class);  
//        AssetReferenceSearch assetReference = new AssetReferenceSearch(node,"/content/dam/companyproject",resourceResolver); 
//        for (Map.Entry<String, Asset> assetMap : assetReference.search().entrySet()) {  
//        	 star1.setAsset(assetMap.getValue());
//             String val = assetMap.getKey();  
//             Asset asset = assetMap.getValue();  
//             Star star = new Star();
//             star.setKey(val);
//             star.setAsset(asset);
//             stars.add(star);
//        }  
//        stars.add(star1);
		
		Resource resource = getResource().getResourceResolver().resolve("/content/dam/companyproject/sparkle.png");
		Asset asset = resource.adaptTo(Asset.class);
		Star star = new Star();
		star.setKey(asset.getPath());
		star.setAsset(asset);
		stars.add(star);
	}
	public List<Star> getStars() {
		return stars;
	}
	
}
