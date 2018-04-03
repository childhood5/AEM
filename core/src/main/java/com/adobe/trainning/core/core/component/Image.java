package com.adobe.trainning.core.core.component;

import org.apache.sling.api.resource.ValueMap;

import com.adobe.cq.sightly.WCMUsePojo;
import com.adobe.trainning.core.core.models.ImageModel;



public class Image extends WCMUsePojo {

	private ImageModel imageModel = new ImageModel();
	
	@Override
	public void activate() throws Exception {
		 ValueMap valueMap = getResource().adaptTo(ValueMap.class);
		 String path = valueMap.get("image", "/content/dam/companyproject/baby.png");
		 String title = valueMap.get("title", "This is a title");
		 String description = valueMap.get("description", "This is a description");
		 String position = valueMap.get("position", "right");
		 imageModel.setPath(path);
		 imageModel.setTitle(title);
		 imageModel.setDescription(description);
		 imageModel.setPosition(position);
	}
	
	public ImageModel getImageModel() {
		return imageModel;
	}
	
}
