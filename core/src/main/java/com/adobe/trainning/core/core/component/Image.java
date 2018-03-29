package com.adobe.trainning.core.core.component;

import org.apache.sling.api.resource.ValueMap;

import com.adobe.cq.sightly.WCMUsePojo;
import com.adobe.trainning.core.core.models.ImageModel;



public class Image extends WCMUsePojo {

	private ImageModel imageModel = new ImageModel();
	
	@Override
	public void activate() throws Exception {
		
		 ValueMap valueMap = getResource().adaptTo(ValueMap.class);
		 String imagePath = valueMap.get("image", "/content/dam/companyproject/baby.png");
		 String imageTitle = valueMap.get("title", "This is a title of image");
		 imageModel.setImagePath(imagePath);
		 imageModel.setImageTitle(imageTitle);
	}
	
	public ImageModel getImageModel() {
		return imageModel;
	}
	
}
