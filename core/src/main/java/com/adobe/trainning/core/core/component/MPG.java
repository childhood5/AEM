package com.adobe.trainning.core.core.component;

import org.apache.sling.api.resource.ValueMap;

import com.adobe.cq.sightly.WCMUsePojo;
import com.adobe.trainning.core.core.models.ImagegModel;



public class MPG extends WCMUsePojo {

	private ImagegModel imagegModel = new ImagegModel();
	
	@Override
	public void activate() throws Exception {
		
		 ValueMap valueMap = getResource().adaptTo(ValueMap.class);
		 String title = valueMap.get("title", "BEST PRICE GUARANTEE");
//		 String text = valueMap.get("text", "Barrière Hotels guarantees guests the best prices on its website ! If you find a better price on another website, we will match it, along with a further 10% off.");
		 imagegModel.setTitle(title);
//		 imagegModel.setText(text);
	}
	
	public ImagegModel getImagegModel() {
		return imagegModel;
	}
	
}
