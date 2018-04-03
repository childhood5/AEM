package com.adobe.trainning.core.core.component;

import org.apache.sling.api.resource.ValueMap;

import com.adobe.cq.sightly.WCMUsePojo;
import com.adobe.trainning.core.core.models.MPGModel;



public class MPG extends WCMUsePojo {

	private MPGModel mPGModel = new MPGModel();
	
	@Override
	public void activate() throws Exception {
		 ValueMap valueMap = getResource().adaptTo(ValueMap.class);
		 String title = valueMap.get("title", "BEST PRICE GUARANTEE");
		 String text = valueMap.get("text", "Barrière Hotels guarantees guests the best prices on its website ! If you find a better price on another website, we will match it, along with a further 10% off.");
		 String label = valueMap.get("label", "FIND OUT MORE");
		 String link = valueMap.get("link", "/content/companyproject");
		 mPGModel.setTitle(title);
		 mPGModel.setText(text);
		 mPGModel.setLabel(label);
		 mPGModel.setLink(link);
	}
	
	public MPGModel getMPGModel() {
		return mPGModel;
	}
	
}
