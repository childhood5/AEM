package com.adobe.trainning.core.core.component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
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
import com.adobe.trainning.core.core.models.TouchMultiBean;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;

public class TouchMultiComponent extends WCMUsePojo {

	private static final Logger LOGGER = LoggerFactory.getLogger(TouchMultiComponent.class);
	private List<TouchMultiBean> submenuItems = new ArrayList<TouchMultiBean>();

	@Override
	public void activate() throws Exception {
		setMultiFieldItems();
	}

	/**
	 * Method to get Multi field data
	 * 
	 * @return submenuItems
	 */
	private List<TouchMultiBean> setMultiFieldItems() {

		try {
			//Creating the Map instance to insert the countries
			final Map<String, String> countries = new LinkedHashMap<String, String>();
			
			final ResourceResolver resolver = getResource().getResourceResolver();
			String suffix = getRequest().getRequestPathInfo().getSuffix();
			Resource res = resolver.getResource(suffix);
			PageManager pageManager= resolver.adaptTo(PageManager.class);
			Page currentPage = pageManager.getContainingPage(res);
			
			List<Page> pages = getAllChildPages(currentPage);
			for(Page page: pages) {
				 countries.put(page.getPath(), page.getPath());
			}
			
			 @SuppressWarnings("unchecked")
			//Creating the Datasource Object for populating the drop-down control.
			 DataSource ds = new SimpleDataSource(new TransformIterator(countries.keySet().iterator(), new Transformer() {
			  
				 @Override
				//Transforms the input object into output object
				 public Object transform(Object o) {
					 String country = (String) o;
					//Allocating memory to Map
					 ValueMap vm = new ValueMapDecorator(new HashMap<String, Object>());
					//Populate the Map
					 vm.put("value", country);
					 vm.put("text", countries.get(country));
					 return new ValueMapResource(resolver, new ResourceMetadata(), "nt:unstructured", vm);
				 }
			 }));
			 this.getRequest().setAttribute(DataSource.class.getName(), ds);
			LOGGER.info("TEXT IS ");
		} catch (Exception e) {
			LOGGER.error("Exception while Multifield data {}", e.getMessage(), e);
		}
		return submenuItems;
	}

	public List<TouchMultiBean> getMultiFieldItems() {
		return submenuItems;
	}
	
	public static List<Page> getAllChildPages(Page currentPage) {
		List<Page> pages = new ArrayList<Page>();
		try {
			Iterator<Page> iterable = currentPage.listChildren();
			if(iterable!=null){
				while(iterable.hasNext()){
					Page childPage=iterable.next();						
					pages.add(childPage);						
				}
			}
		} catch (Exception e) {
			LOGGER.info("Exception: " + e.toString() + "default value return");
		}
		return pages;
	}
	
	
}