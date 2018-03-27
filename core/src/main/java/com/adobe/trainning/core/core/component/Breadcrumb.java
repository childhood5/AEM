package com.adobe.trainning.core.core.component;

import java.util.ArrayList;
import java.util.List;

import com.adobe.cq.sightly.WCMUsePojo;
import com.adobe.trainning.core.core.models.BreadcrumbModel;
import com.day.cq.wcm.api.Page;

public class Breadcrumb extends WCMUsePojo {

	private List<BreadcrumbModel> breadcrumbs = new ArrayList<BreadcrumbModel>();
	
	@Override
	public void activate() throws Exception {
		
		// To get the title of the current page
		int level = getCurrentPage().getDepth();
		// To find the depth of the current page from the root
		// To store the traversed page (object) from the root
		for (int i = 1; i < level; i++) { // Here I used i=1 for mycase(i=0 will be /content)
			Page page = getCurrentPage().getAbsoluteParent(i);
			// To get the absolute parent at each level from root
			BreadcrumbModel breadcrumb = new BreadcrumbModel();
			breadcrumb.setTitle(page.getTitle());
			breadcrumbs.add(breadcrumb);
		}
	}
	public List<BreadcrumbModel> getBreadcrumbs() {
		return breadcrumbs;
	}
	
}
