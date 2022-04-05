package alv.fredrik.chashka.security

import org.springframework.security.oauth2.core.OAuth2Error
import org.springframework.security.oauth2.core.OAuth2ErrorCodes
import org.springframework.security.oauth2.core.OAuth2TokenValidator
import org.springframework.security.oauth2.core.OAuth2TokenValidatorResult
import org.springframework.security.oauth2.jwt.Jwt
import org.springframework.util.Assert

class AudienceValidator(private val audience: String) : OAuth2TokenValidator<Jwt> {

    init {
        Assert.hasText(audience, "audience is null or empty")
    }

    override fun validate(token: Jwt?): OAuth2TokenValidatorResult {
        if (token == null) return OAuth2TokenValidatorResult.failure(OAuth2Error(OAuth2ErrorCodes.UNSUPPORTED_TOKEN_TYPE))

        val audiences = token.audience

        if (audiences.contains(audience)) return OAuth2TokenValidatorResult.success()

        return OAuth2TokenValidatorResult.failure(OAuth2Error(OAuth2ErrorCodes.INVALID_TOKEN))
    }
}