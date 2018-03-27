package com.adobe.trainning.core.core.component;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.sightly.WCMUsePojo;
import com.adobe.trainning.core.core.models.HeroTextBean;

public class HeroTextComponent extends WCMUsePojo
{
    
     /** The hero text bean. */
    private HeroTextBean heroTextBean = null;
      
    /** Default log. */
    protected final Logger log = LoggerFactory.getLogger(this.getClass());
         
    @Override
    public void activate() throws Exception {
          
      heroTextBean = new HeroTextBean();
           
        //Get the values that the author entered into the AEM dialog
       String drop = getProperties().get("childnode", "");
             
       heroTextBean.setDrop(drop); 
                               
    }
    
         
    public HeroTextBean getHeroTextBean() {
        return this.heroTextBean;
    }
}