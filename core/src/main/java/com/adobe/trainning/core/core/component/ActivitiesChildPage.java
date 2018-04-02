package com.adobe.trainning.core.core.component;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.Transformer;
import org.apache.commons.collections.iterators.TransformIterator;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceMetadata;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.api.wrappers.ValueMapDecorator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.sightly.WCMUsePojo;
import com.adobe.granite.ui.components.ds.DataSource;
import com.adobe.granite.ui.components.ds.SimpleDataSource;
import com.adobe.granite.ui.components.ds.ValueMapResource;
import com.adobe.trainning.core.core.util.PageUtil;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;

public class ActivitiesChildPage extends WCMUsePojo {

	private static final Logger LOGGER = LoggerFactory.getLogger(ActivitiesChildPage.class);

	@Override
	public void activate() throws Exception {
		try {
			final Map<String, String> childPages = new LinkedHashMap<String, String>();
			final ResourceResolver resolver = getResource().getResourceResolver();
			String suffix = getRequest().getRequestPathInfo().getSuffix();
			Resource res = resolver.getResource(suffix);
			PageManager pageManager = resolver.adaptTo(PageManager.class);
			Page currentPage = pageManager.getContainingPage(res);

			List<Page> pages = PageUtil.getAllChildPages(currentPage);
			for (Page page : pages) {
				childPages.put(page.getPath(), page.getPath());
			}

			@SuppressWarnings("unchecked")
			DataSource ds = new SimpleDataSource(new TransformIterator(childPages.keySet().iterator(), new Transformer() {
					// Transforms the input object into output object
					@Override
					public Object transform(Object obj) {
						String pagePath = (String) obj;
						// Allocating memory to Map
						ValueMap valueMap = new ValueMapDecorator(new HashMap<String, Object>());
						// Populate the Map
						valueMap.put("value", pagePath);
						valueMap.put("text", childPages.get(pagePath));
						return new ValueMapResource(resolver, new ResourceMetadata(), "nt:unstructured", valueMap);
					}
				})
			);
			this.getRequest().setAttribute(DataSource.class.getName(), ds);
		} catch (Exception e) {
			LOGGER.error(e.toString());
		}
	}
}