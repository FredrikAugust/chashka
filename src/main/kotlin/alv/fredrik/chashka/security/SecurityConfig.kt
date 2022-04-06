package alv.fredrik.chashka.security

import org.springframework.beans.factory.annotation.Value
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator
import org.springframework.security.oauth2.core.OAuth2TokenValidator
import org.springframework.security.oauth2.jwt.*
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
class SecurityConfig(
    @Value("\${auth0.audience}")
    private val audience: String,

    @Value("\${spring.security.oauth2.resourceserver.jwt.issuer-uri}")
    private val issuer: String
) : WebSecurityConfigurerAdapter() {

    override fun configure(http: HttpSecurity?) {
        if (http == null) return

        http
            .authorizeRequests()
            .anyRequest()
            .authenticated()
            .and()
            .oauth2ResourceServer()
            .jwt()
            .decoder(jwtDecoder())
            .jwtAuthenticationConverter(jwtAuthenticationConverter())

        http.cors()
    }

    fun jwtDecoder(): JwtDecoder {
        val withAudience: OAuth2TokenValidator<Jwt> = AudienceValidator(audience)
        val withIssuer: OAuth2TokenValidator<Jwt> = JwtValidators.createDefaultWithIssuer(issuer)
        val validator: OAuth2TokenValidator<Jwt> = DelegatingOAuth2TokenValidator(withAudience, withIssuer)

        val jwtDecoder = JwtDecoders.fromOidcIssuerLocation<NimbusJwtDecoder>(issuer)
        jwtDecoder.setJwtValidator(validator)

        return jwtDecoder
    }

    fun jwtAuthenticationConverter(): JwtAuthenticationConverter {
        val converter = JwtGrantedAuthoritiesConverter()
        converter.setAuthoritiesClaimName("permissions")
        converter.setAuthorityPrefix("")

        val jwtConverter = JwtAuthenticationConverter()
        jwtConverter.setJwtGrantedAuthoritiesConverter(converter)

        return jwtConverter
    }

}