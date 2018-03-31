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
		
		int level = getCurrentPage().getDepth();
		for (int i = 2; i < level; i++) {
			Page page = getCurrentPage().getAbsoluteParent(i);
			BreadcrumbModel breadcrumb = new BreadcrumbModel();
			breadcrumb.setTitle(page.getTitle());
			breadcrumb.setPath(page.getPath());
			breadcrumbs.add(breadcrumb);
		}
	}
	public List<BreadcrumbModel> getBreadcrumbs() {
		return breadcrumbs;
	}
	
}
